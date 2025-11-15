import request from "supertest";
import path from "path";
import app from "../src/app";

// mock del servicio que llama a OpenAI
jest.mock("../src/services/analyze.service", () => ({
  analyzeImageService: jest.fn().mockResolvedValue([
    { label: "Dog", confidence: 0.98 },
    { label: "Grass", confidence: 0.9 },
  ]),
}));

describe("POST /api/analyze", () => {
  it("should return 400 if no file is provided", async () => {
    const res = await request(app).post("/api/analyze");

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("should return 400 if file is not an image", async () => {
    const res = await request(app)
      .post("/api/analyze")
      .attach("image", Buffer.from("not-an-image"), {
        filename: "test.txt",
        contentType: "text/plain",
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("should return tags when a valid image is sent", async () => {
    const imagePath = path.join(__dirname, "fixtures", "sample.jpg");

    const res = await request(app)
      .post("/api/analyze")
      .attach("image", imagePath);

    expect(res.status).toBe(200);
    expect(res.body.tags).toBeDefined();
    expect(Array.isArray(res.body.tags)).toBe(true);
    expect(res.body.tags[0]).toHaveProperty("label");
    expect(res.body.tags[0]).toHaveProperty("confidence");
  });
});
