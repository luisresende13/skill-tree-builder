import { SkillCategory } from '../types';

export async function getNextSkills(
  domain: string,
  knownSkills: string[],
  existingSkills: string[],
): Promise<SkillCategory> {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ domain, knownSkills, existingSkills }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch from the backend API.');
  }

  return response.json();
}
