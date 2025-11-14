import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeImageService = async (buffer: Buffer) => {
  try {
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
                url: `data:image/jpeg;base64,${base64}`,
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

    const parsed = JSON.parse(raw_content || "{}");

    if (!parsed.tags) {
      throw new Error("Invalid response from OpenAI Vision");
    }
    return parsed.tags;
  } catch (error: any) {
    console.error("OpenAI Vision error:", error);
    throw new Error(
      error.message || "Failed to analyze image with OpenAI Vision"
    );
  }
};
