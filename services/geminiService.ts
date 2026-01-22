
import { GoogleGenAI, Type } from "@google/genai";
import { IdentifiedCar, BodyType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const identifyCarFromImage = async (base64Image: string): Promise<IdentifiedCar> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `Identify this vehicle from the image within the context of the Indian Market in 2025. Provide details including Manufacturer, Model (latest 2025 variants if applicable), Color (predominant color visible), Body Type (SUV, Sedan, Hatchback, Truck, or Coupe), Fuel Type, and Approximate Price Range in Indian Rupees (INR). Express the price range in Lakhs or Crores. Also provide a 2-sentence design analysis highlighting its modern aesthetic features. Return the data in valid JSON format only.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          manufacturer: { type: Type.STRING },
          model: { type: Type.STRING },
          color: { type: Type.STRING },
          bodyType: { type: Type.STRING, description: "Must be one of: SUV, Sedan, Hatchback, Truck, Coupe" },
          fuelType: { type: Type.STRING },
          estimatedPrice: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          designAnalysis: { type: Type.STRING }
        },
        required: ["manufacturer", "model", "color", "bodyType", "fuelType", "estimatedPrice", "confidence", "designAnalysis"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}') as IdentifiedCar;
    return data;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not identify vehicle model reliably.");
  }
};
