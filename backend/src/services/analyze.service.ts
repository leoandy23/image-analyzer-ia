import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to detect image format from buffer
const detectImageFormat = (buffer: Buffer): string => {
  if (buffer.length < 12) {
    throw new Error("File too small to detect image format");
  }

  const signature = buffer.toString("hex", 0, 12);

  // JPEG: FF D8 FF
  if (signature.startsWith("ffd8ff")) return "image/jpeg";

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (signature.startsWith("89504e470d0a1a0a")) return "image/png";

  // WebP: RIFF....WEBP
  // RIFF signature (52 49 46 46) + WEBP (57 45 42 50) at position 8
  if (
    signature.startsWith("52494646") &&
    buffer.toString("hex", 8, 12) === "57454250"
  ) {
    return "image/webp";
  }

  throw new Error("Unsupported image format");
};

export const analyzeImageService = async (buffer: Buffer) => {
  try {
    // Detect image format
    const realMime = detectImageFormat(buffer);

    const base64 = buffer.toString("base64");
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${realMime};base64,${base64}`,
              },
            },
            {
              type: "text",
              text: "Analyze this image and return JSON with an array of tags. Each tag must have { label, confidence }. Return ONLY JSON without any additional text or markdown formatting.",
            },
          ],
        },
      ],
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const raw_content = response.choices[0].message?.content || "";

    // Clean response in case OpenAI adds markdown
    let cleanedContent = raw_content.trim();
    if (cleanedContent.startsWith("```json")) {
      cleanedContent = cleanedContent
        .replace(/```json\s*/, "")
        .replace(/\s*```/, "");
    } else if (cleanedContent.startsWith("```")) {
      cleanedContent = cleanedContent
        .replace(/```\s*/, "")
        .replace(/\s*```/, "");
    }

    const parsed = JSON.parse(cleanedContent || "{}");

    if (!parsed.tags || !Array.isArray(parsed.tags)) {
      throw new Error(
        "Invalid response from OpenAI Vision - missing tags array"
      );
    }

    return parsed.tags;
  } catch (error: any) {
    console.error("OpenAI Vision error:", error);
    throw new Error(
      error.message || "Failed to analyze image with OpenAI Vision"
    );
  }
};
