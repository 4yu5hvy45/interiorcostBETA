
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
    User's Goal Budget: ${budget}
    Desired Mood: ${mood}

    STRICT GUIDELINES:
    1. Think like a "budget hacker." Focus on rented homes and typical "unaesthetic" Indian apartments (exposed wires, tubelights, mismatched furniture).
    2. Prioritize high-impact, low-cost fixes:
       - Painting walls flat white/off-white to create space.
       - Swapping tubelights for warm floor lamps or Edison bulbs (₹500-₹1500).
       - Adding cheap indoor plants (Snake plants, Pothos).
       - Simple decluttering and cable management.
       - Neutral curtains to replace busy patterns.
    3. Be honest. If the layout is the main problem, suggest moving furniture first.
    4. Avoid luxury/architect-grade language. Use words like "homely," "breathable," and "clean."
    5. Cost estimate must be in Rupees (₹) and presented as a range like "₹X - ₹Y".
    6. No emojis.

    Return the analysis in the following JSON format:
    {
      "verdict": "A concise assessment of why the room feels unaesthetic and its potential.",
      "estimated_cost": "A realistic budget range in ₹.",
      "worth_fixing": ["List 3-5 specific low-cost hacks"],
      "avoid_spending_on": ["List items to NOT waste money on"],
      "reasoning": "Explain why these simple changes (like lighting or paint) will change the energy of the space."
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
            worth_fixing: { type: Type.ARRAY, items: { type: Type.STRING } },
            avoid_spending_on: { type: Type.ARRAY, items: { type: Type.STRING } },
            reasoning: { type: Type.STRING }
          },
          required: ["verdict", "estimated_cost", "worth_fixing", "avoid_spending_on", "reasoning"]
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

    Visual Style: 
    Implement specific low-cost hacks: Warm lighting (yellow/orange glow), white walls, healthy indoor plants, and tidy surfaces. 
    Keep the furniture structure the same but make the space feel breathable and intentional. 
    It must look like a real home improvement, not a render. No luxury marble or false ceilings.
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
