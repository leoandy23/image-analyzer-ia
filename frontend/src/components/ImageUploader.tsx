import { useEffect, useState, useRef } from "react";
import { analyzeImage } from "../services/api";
import type { ImageTag } from "../types/ImageTags";

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<ImageTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (tags.length > 0) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [tags]);

  useEffect(() => {
    let progressInterval: number;

    if (loading) {
      progressInterval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90;
          return prev + Math.random() * 15;
        });
      }, 300);
    } else {
      setProgress(0);
    }

    return () => clearInterval(progressInterval);
  }, [loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    processFile(selected);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      processFile(droppedFile);
    } else {
      setError("Please drop a valid image file");
    }
  };

  const processFile = (selected: File | null) => {
    setFile(selected);
    setTags([]);
    setError("");

    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      const url = URL.createObjectURL(selected);
      setPreview(url);
    } else {
      setPreview(null);
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
      setProgress(0);

      const result = await analyzeImage(file);
      setProgress(100);

      // Pequeño delay para mostrar el 100%
      setTimeout(() => {
        setTags(result);
        setLoading(false);
      }, 500);
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Image Analyzer AI</h1>
          <p className="subtitle">
            Upload an image to discover its content with AI-powered analysis
          </p>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`upload-area ${dragOver ? "upload-area--dragover" : ""} ${
            preview ? "upload-area--has-preview" : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="upload-input"
            id="file-input"
          />

          {!preview ? (
            <div className="upload-placeholder">
              <div className="upload-icon">📁</div>
              <p className="upload-text">Drag & drop your image here</p>
              <p className="upload-subtext">or click to browse</p>
              <p className="upload-hint">Supports: JPG, PNG, WEBP — Max: 5MB</p>
            </div>
          ) : (
            <div className="preview-container">
              <img src={preview} alt="preview" className="preview-image" />
              <button
                className="preview-remove"
                onClick={() => processFile(null)}>
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="progress-section">
            <div className="progress-header">
              <span>Analyzing Image...</span>
              <span className="progress-percent">{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-steps">
              <span className={progress > 0 ? "step-active" : ""}>
                Uploading
              </span>
              <span className={progress > 30 ? "step-active" : ""}>
                Processing
              </span>
              <span className={progress > 60 ? "step-active" : ""}>
                Analyzing
              </span>
              <span className={progress > 90 ? "step-active" : ""}>
                Complete
              </span>
            </div>
          </div>
        )}

        {/* Analyze Button */}
        {preview && !loading && (
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="analyze-button">
            <span className="button-icon">🔍</span>
            Analyze Image
          </button>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Results Section */}
        {tags.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h2 className="results-title">Analysis Results</h2>
              <p className="results-subtitle">
                AI-powered tags detected in your image
              </p>
            </div>

            <div className="tags-grid">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="tag-card"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}>
                  <div className="tag-header">
                    <span className="tag-label">{tag.label}</span>
                    <span className="tag-confidence">
                      {(tag.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="confidence-bar">
                    <div
                      className="confidence-fill"
                      style={{ width: `${tag.confidence * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
