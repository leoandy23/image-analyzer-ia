import { Request, Response } from "express";
import { analyzeImageService } from "../services/analyze.service";

export const analyzeImageController = async (req: Request, res: Response) => {
  try {
    // validate file
    if (!req.file) {
      return res.status(400).json({ error: "No image file was provided" });
    }
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!allowed.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ error: "Only JPG, PNG or WEBP images are allowed" });
    }

    if ((req as any).fileValidationError) {
      return res.status(400).json({ error: (req as any).fileValidationError });
    }

    const buffer = req.file.buffer;

    // call service
    const tags = await analyzeImageService(buffer);

    res.json({ tags });
  } catch (error: any) {
    console.error("Analyze error:", error);
    res.status(500).json({
      error: "Failed to analyze the image",
      details: error.message || "Unknown error",
    });
  }
};
