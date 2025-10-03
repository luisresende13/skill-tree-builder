import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { z } from 'zod';
import { SkillCategory } from '../types';
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '../constants';

// --- Custom Error Classes ---
export class ApiKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiKeyError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// --- Zod Schema for Validation ---
const SkillSchema = z.object({
  name: z.string(),
  description: z.string(),
  prerequisite: z.string(),
});

const SkillCategorySchema = z.object({
  category: z.string(),
  skills: z.array(SkillSchema),
});

// --- API Key Validation ---
if (!process.env.API_KEY) {
  throw new ApiKeyError(
    'The GEMINI_API_KEY environment variable is not set. Please create a `.env` file in the root of the project and add your API key.',
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getNextSkills(
  domain: string,
  knownSkills: string[],
  existingSkills: string[],
): Promise<SkillCategory> {
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
    const parsedJson = JSON.parse(jsonText);

    // Validate with Zod
    const validationResult = SkillCategorySchema.safeParse(parsedJson);
    if (!validationResult.success) {
      console.error('Zod validation error:', validationResult.error.issues);
      throw new ValidationError(
        'Invalid data structure received from the API.',
      );
    }

    return validationResult.data;
  } catch (error) {
    console.error('Error in getNextSkills:', error);
    if (error instanceof ApiKeyError || error instanceof ValidationError) {
      throw error; // Re-throw custom errors directly
    }
    // Wrap other errors in a generic ApiError
    throw new ApiError('Failed to get a valid response from the AI assistant.');
  }
}
