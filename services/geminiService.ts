import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SkillCategory } from '../types';
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getNextSkills(domain: string, knownSkills: string[], existingSkills: string[]): Promise<SkillCategory> {
  const userPrompt = `Domain: "${domain}"\nKnown Skills: [${knownSkills.join(', ')}]\nExisting Skills in Tree: [${existingSkills.join(', ')}]`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.3,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse: SkillCategory = JSON.parse(jsonText);
    
    // Basic validation
    if (!parsedResponse.category || !Array.isArray(parsedResponse.skills)) {
      throw new Error('Invalid JSON structure received from API');
    }
    
    return parsedResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        console.error("Error message:", error.message);
    }
    throw new Error("Failed to get a valid response from the AI assistant.");
  }
}