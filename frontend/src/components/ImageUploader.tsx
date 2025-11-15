import { useState } from "react";
import { analyzeImage } from "../services/api";
import type { ImageTag } from "../types/ImageTags";

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<ImageTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setTags([]);
    setError("");

    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreview(url);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await analyzeImage(file);
      setTags(result);
    } catch (err: any) {
      setError(err.response?.data?.error || "Image analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <h2>Image Analyzer</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div style={{ marginTop: 20 }}>
          <img
            src={preview}
            alt="preview"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{ marginTop: 20, padding: "10px 20px" }}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      {loading && <p>Processing image...</p>}

      {tags.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Tags</h3>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                {tag.label} — {(tag.confidence * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
