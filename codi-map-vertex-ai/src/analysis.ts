import { GenerateContentRequest } from "@google-cloud/vertexai";
import { model } from "./model";

export async function analyzeImage(cloudStorageUri: string, format = "image/jpg") {
  const request: GenerateContentRequest = {
    contents: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              fileUri: cloudStorageUri,
              mimeType: format,
            },
          },
        ],
      },
    ],
  };

  const response = await model.generateContentStream(request);
  const result = await response.response;
  if (!(result.candidates && result.candidates.length > 0)) throw new Error("No Response");

  const data = result.candidates[0].content.parts.reduce((acc, part) => acc + part.text, "");
  const processedJsonData = data.replaceAll("```", "").replace("json", "").trim();
  const parsedJsonData = JSON.parse(processedJsonData);

  return parsedJsonData;
}
