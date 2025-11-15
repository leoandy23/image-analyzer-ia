import axios from "axios";
import type { ImageTag } from "../types/ImageTags";

const API_URL = "http://localhost:3000/api/analyze";

export const analyzeImage = async (file: File): Promise<ImageTag[]> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.tags;
};
