import { Router } from "express";
import multer from "multer";
import { analyzeImageController } from "../controllers/analyze.controller";

const router = Router();

// multer config: save file in memory with size limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // limit of 5MB
});

router.post("/analyze", upload.single("image"), analyzeImageController);

export default router;
