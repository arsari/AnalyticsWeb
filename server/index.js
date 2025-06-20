import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Parse application/json

/**
 * Analytic Tools Keys Proxy Endpoint
 */
app.get("/config", (req, res) => {
  res.json({
    AMPLITUDE_KEY: process.env.AMPLITUDE_KEY,
    MIXPANEL_KEY: process.env.MIXPANEL_KEY,
    HEAP_DEV_KEY: process.env.HEAP_DEV_KEY,
    HEAP_PROD_KEY: process.env.HEAP_PROD_KEY,
  });
});

/**
 * NEW: Gemini Proxy Endpoint
 */
const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: process.env.GOOGLE_CLOUD_LOCATION,
});

if (!ai.isError) {
  console.log("✅ Gemini AI client initialized successfully");
} else {
  console.error("🛑 Error initializing Gemini AI client:", ai.error);
}

app.post("/gemini-proxy", async (req, res) => {
  try {
    const { messages } = req.body;

    // Build a single prompt from your conversation history
    const prompt = messages
      .map((m) => `${m.role === "system" ? "" : `${m.role}: `}${m.content}`)
      .join("\n\n");

    // Call the Gemini API via the Generative AI SDK
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // use your desired Gemini model
      contents: [prompt],
    });
    res.json({ reply: response.text });
  } catch (err) {
    console.error("🛑 Gemini Proxy Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Start the Express server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
