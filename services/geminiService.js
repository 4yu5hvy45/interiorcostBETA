
import { GoogleGenAI, Type } from "@google/genai";
import { Verdict, BudgetLevel, Mood } from "../types";

export async function analyzeRoom(
  imageData: string,
  budget: BudgetLevel,
  mood: Mood
): Promise<Verdict> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    As an honest, practical Indian interior advisor for "unaesthetic" spaces, analyze this room photo.
    User's Goal Budget Level: ${budget}
    Desired Mood: ${mood}

    STRICT GUIDELINES:
    1. Think like a "budget hacker." Focus on rented homes and typical "unaesthetic" Indian apartments.
    2. Prioritize high-impact, low-cost fixes: lighting, paint, plants, decluttering.
    3. Provide a structured breakup of costs with ranges (e.g., "18,000 - 22,000").
    4. Include an "Ultra-budget version" for users who negotiate labor or reuse items.
    5. Include a "Designer POV" honest take, specifically a formula like "X + Y = Z% transformation".

    Return the analysis in the following JSON format:
    {
      "verdict": "Short summary",
      "estimated_cost": "₹TOTAL_MIN - ₹TOTAL_MAX",
      "ultra_budget_cost": "₹ULTRA_MIN - ₹ULTRA_MAX",
      "transformation_logic": "White paint + warm lighting = 70% transformation (or similar)",
      "breakup": [
        {"item": "Wall + ceiling paint", "cost": "18,000 - 22,000"},
        {"item": "Lighting", "cost": "2,000 - 2,500"}
      ],
      "worth_fixing": ["Point 1", "Point 2"],
      "avoid_spending_on": ["Skip this", "Skip that"],
      "reasoning": "Simple explanation of the change in energy."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: imageData.split(',')[1] } },
            { text: prompt }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdict: { type: Type.STRING },
            estimated_cost: { type: Type.STRING },
            ultra_budget_cost: { type: Type.STRING },
            transformation_logic: { type: Type.STRING },
            breakup: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  cost: { type: Type.STRING }
                },
                required: ["item", "cost"]
              }
            },
            worth_fixing: { type: Type.ARRAY, items: { type: Type.STRING } },
            avoid_spending_on: { type: Type.ARRAY, items: { type: Type.STRING } },
            reasoning: { type: Type.STRING }
          },
          required: ["verdict", "estimated_cost", "ultra_budget_cost", "transformation_logic", "breakup", "worth_fixing", "avoid_spending_on", "reasoning"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");
    
    return JSON.parse(resultText) as Verdict;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}

export async function visualizeImprovements(
  originalImageData: string,
  verdict: Verdict,
  mood: Mood
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Based on this "unaesthetic" Indian room, generate a realistic "after" concept.
    Improvements: ${verdict.worth_fixing.join(', ')}
    Mood: ${mood}
    Implement specific low-cost hacks: Warm lighting, white walls, plants. 
    Keep furniture structure same but make space breathable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: originalImageData.split(',')[1],
              mimeType: 'image/jpeg',
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image part found in response");
  } catch (error) {
    console.error("Gemini Visualization Error:", error);
    throw error;
  }
}
