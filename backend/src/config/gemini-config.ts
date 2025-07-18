import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

export const configureGemini = () => {
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
};
