import { Type } from '@google/genai';

export const DOMAIN_CATEGORIES = {
  "Software & Web": [
    "Frontend Development",
    "Backend Development",
    "Full-Stack Development",
    "DevOps & Cloud Infrastructure",
    "Mobile Development (iOS & Android)",
    "Game Development",
    "Cybersecurity",
    "Blockchain & Web3",
    "UI/UX Design",
    "WordPress Development",
    "Shopify Development",
  ],
  "Data & AI": [
    "Data Science",
    "Machine Learning Engineering",
    "Artificial Intelligence Research",
    "Data Engineering",
    "Data Analytics",
    "Big Data Technologies",
    "Business Intelligence",
    "Natural Language Processing (NLP)",
  ],
  "Creative & Design": [
    "Graphic Design",
    "3D Modeling & Animation",
    "Video Editing & Production",
    "Motion Graphics",
    "Music Production",
    "Creative Writing",
    "Photography",
  ],
  "Business & Marketing": [
    "Digital Marketing",
    "Search Engine Optimization (SEO)",
    "Content Marketing",
    "Social Media Management",
    "Product Management",
    "Agile & Scrum Methodologies",
    "Project Management",
    "Financial Analysis",
  ],
  "Hardware & Systems": [
      "Embedded Systems",
      "IoT (Internet of Things)",
      "Robotics",
      "Network Administration",
      "System Administration (Linux/Windows)",
  ]
};

export const SYSTEM_PROMPT = `You are a Skill Tree Architect AI. Your purpose is to help users build a visual map of their technical skills. Given a technology domain and lists of skills the user knows and skills already in the tree, you must identify the next logical set of skills to learn.

Your response MUST be a JSON object that strictly conforms to the provided schema.

- The response should contain a single, focused category of skills (3-5 items).
- The 'prerequisite' field for each skill is crucial. It MUST match one of the skills from the user's 'knownSkills' list provided in the prompt. This is essential for connecting the skill tree.
- For the very first request where 'knownSkills' and 'existingSkills' are empty, provide the most foundational skills for the given domain. The 'prerequisite' for these foundational skills should be the domain name itself (e.g., 'Frontend Development' or 'Data Science, Machine Learning Engineering').
- Do not suggest skills that are already in the 'Existing Skills in Tree' list. This list includes both known skills and skills suggested but not yet learned. Avoid suggesting variations of existing skills (e.g., if "Deep Learning with TensorFlow" exists, do not suggest "TensorFlow Fundamentals").
- When there are no more logical skills to suggest in the main path, return a response with an empty 'skills' array.`;

export const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
      description: "Name of the new skill category (e.g., 'JavaScript Frameworks').",
    },
    skills: {
      type: Type.ARRAY,
      description: "A list of skills in this category.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Name of the skill (e.g., 'React').",
          },
          description: {
            type: Type.STRING,
            description: "A brief, one-sentence description of the skill.",
          },
          prerequisite: {
            type: Type.STRING,
            description: "The skill from the user's known list that this new skill builds upon (e.g., 'JavaScript').",
          },
        },
        required: ['name', 'description', 'prerequisite'],
      },
    },
  },
  required: ['category', 'skills'],
};