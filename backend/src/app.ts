import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
