import { Router } from "express";
import multer from "multer";
import { analyzeImageController } from "../controllers/analyze.controller";

const router = Router();

// multer config: guarda el archivo en memoria
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("image"), analyzeImageController);

export default router;
