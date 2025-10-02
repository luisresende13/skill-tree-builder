import { useState, useEffect, useCallback } from 'react';
import { Skill, SkillCategory, ApiSkill } from '../types';
import { getNextSkills } from '../services/geminiService';

export const useSkillTree = (domain: string) => {
  const [tree, setTree] = useState<Skill[]>([]);
  const [knownSkills, setKnownSkills] = useState<string[]>([]);
  const [learningSkills, setLearningSkills] = useState<Skill[]>([]);
  const [currentCategory, setCurrentCategory] = useState<SkillCategory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Fetch initial skills on mount
  useEffect(() => {
    const fetchInitialSkills = async () => {
      try {
        setIsLoading(true);
        const initialCategory = await getNextSkills(domain, [], []);
        setCurrentCategory(initialCategory);
      } catch (error) {
        console.error('Failed to fetch initial skills:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialSkills();
  }, [domain]);

  const handleConfirmSelection = useCallback(async (selectedSkillNames: string[]) => {
    if (!currentCategory) return;

    setIsLoading(true);

    const newKnownFromSelection = new Set(selectedSkillNames);
    
    const categorySkills: Skill[] = currentCategory.skills.map((apiSkill: ApiSkill) => ({
      ...apiSkill,
      status: newKnownFromSelection.has(apiSkill.name) ? 'known' : 'learning',
    }));

    const newlyKnownSkills = categorySkills.filter(s => s.status === 'known').map(s => s.name);
    const updatedKnownSkills = [...new Set([...knownSkills, ...newlyKnownSkills])];
    
    setTree(prevTree => [...prevTree, ...categorySkills]);
    setKnownSkills(updatedKnownSkills);
    setLearningSkills(prev => [...prev, ...categorySkills.filter(s => s.status === 'learning')]);
    setCurrentCategory(null);

    try {
      const allExistingSkillNames = [...tree.map(s => s.name), ...currentCategory.skills.map(s => s.name)];
      const nextCategory = await getNextSkills(domain, updatedKnownSkills, allExistingSkillNames);
      if (nextCategory && nextCategory.skills.length > 0) {
        setCurrentCategory(nextCategory);
      } else {
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Failed to fetch next skills:', error);
      setIsComplete(true); // End on error to prevent infinite loading
    } finally {
      setIsLoading(false);
    }
  }, [currentCategory, knownSkills, domain, tree]);

  return {
    tree,
    knownSkills,
    learningSkills,
    currentCategory,
    isLoading,
    isComplete,
    handleConfirmSelection,
  };
};