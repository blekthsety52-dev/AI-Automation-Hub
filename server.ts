import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize GoogleGenAI client safely inside a helper
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API: Check Status
app.get("/api/ai-status", (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY;
  res.json({
    status: "ok",
    hasApiKey: hasKey,
    configuredModel: "gemini-3.1-pro-preview"
  });
});

// API: Generate Text
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, useHighThinking, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getAiClient();
    
    // Choose model based on whether "high thinking" is enabled or "The best Gemini model is chosen automatically"
    const selectedModel = useHighThinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash";

    console.log(`Sending text request to ${selectedModel}...`);
    
    const config: any = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    
    // Config reasoning level if using gemini-3.1-pro-preview
    if (selectedModel === "gemini-3.1-pro-preview") {
      config.thinkingConfig = { thinkingLevel: "HIGH" }; // HIGH triggers deep reasoning loops
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config,
    });

    res.json({
      success: true,
      text: response.text,
      modelUsed: selectedModel,
    });
  } catch (error: any) {
    console.error("Gemini Text Generation Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate AI content",
    });
  }
});

// API: Generate Image with Gemini Nano Banana Pro / Image generating models
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, imageSize = "1K", aspectRatio = "1:1", useProModel } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getAiClient();
    // Choose gemini-3-pro-image (nano banana pro) or gemini-3.1-flash-image (standard)
    const selectedModel = useProModel ? "gemini-3-pro-image" : "gemini-3.1-flash-image";

    console.log(`Generating image using ${selectedModel} (Size: ${imageSize}, Aspect: ${aspectRatio})...`);

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio,
          imageSize,
        },
      },
    });

    let imageUrl = "";
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64Data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data returned from model candidates");
    }

    res.json({
      success: true,
      imageUrl,
      modelUsed: selectedModel,
    });
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate AI image",
    });
  }
});

// Serve frontend with Vite in development, static in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
