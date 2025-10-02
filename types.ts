export type SkillStatus = 'known' | 'learning' | 'candidate';

export interface Skill {
  name: string;
  description: string;
  prerequisite: string | null;
  status: SkillStatus;
}

export interface ApiSkill {
  name: string;
  description: string;
  prerequisite: string;
}

export interface SkillCategory {
  category: string;
  skills: ApiSkill[];
}

// FIX: Added missing type definitions for chat components to resolve compilation errors.
export interface ChecklistItem {
  name: string;
  checked: boolean;
}

export interface ChecklistData {
  category: string;
  items: ChecklistItem[];
}

export interface ChatMessageData {
  role: 'user' | 'model';
  text: string;
  summary?: string;
  checklist?: ChecklistData;
}
