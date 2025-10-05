import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { z } from 'zod';
import { SkillCategory } from '../types.js';
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '../constants.js';

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
if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    'The GEMINI_API_KEY environment variable is not set. This is required for the backend server.',
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();
const port = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

// API endpoint to proxy requests to the Gemini API
app.post('/api/gemini', async (req, res) => {
  const { domain, knownSkills, existingSkills } = req.body;

  if (!domain || !knownSkills || !existingSkills) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  const userPrompt = `Domain: "${domain}"\nKnown Skills: [${knownSkills.join(
    ', ',
  )}]\nExisting Skills in Tree: [${existingSkills.join(', ')}]`;

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

    const text = response.text;
    if (!text) {
      return res
        .status(500)
        .json({ error: 'Received an empty response from the API.' });
    }

    const jsonText = text.trim();
    const parsedJson = JSON.parse(jsonText);

    // Validate with Zod
    const validationResult = SkillCategorySchema.safeParse(parsedJson);
    if (!validationResult.success) {
      console.error('Zod validation error:', validationResult.error.issues);
      return res
        .status(500)
        .json({ error: 'Invalid data structure received from the API.' });
    }

    res.json(validationResult.data);
  } catch (error) {
    console.error('Error proxying request to Gemini API:', error);
    res.status(500).json({ error: 'Failed to fetch from Gemini API.' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
