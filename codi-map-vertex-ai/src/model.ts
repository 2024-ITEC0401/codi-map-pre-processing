import { GenerateContentRequest, HarmBlockThreshold, HarmCategory, VertexAI } from "@google-cloud/vertexai";
import { GCP, VERTEX_AI } from "./config";

export const vertexAI = new VertexAI({
  project: GCP.PROJECT_ID,
  location: VERTEX_AI.LOCATION,
});

export const model = vertexAI.getGenerativeModel({
  model: VERTEX_AI.MODEL,
  generationConfig: {
    temperature: VERTEX_AI.TEMPERATURE,
    maxOutputTokens: VERTEX_AI.MAX_OUTPUT_TOKEN,
  },
});
