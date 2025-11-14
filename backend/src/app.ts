import express, { Application } from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze.route";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// analyze route
app.use("/api", analyzeRoute);

export default app;
