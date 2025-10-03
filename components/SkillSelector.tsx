import React, { useState } from 'react';
import { SkillCategory } from '../types';
import SkillCard from './SkillCard';
import LoadingSpinner from './LoadingSpinner';

interface SkillSelectorProps {
  category: SkillCategory;
  onConfirm: (selectedSkills: string[]) => void;
  isLoading: boolean;
}

const SkillSelector: React.FC<SkillSelectorProps> = ({
  category,
  onConfirm,
  isLoading,
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleSelect = (skillName: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(skillName)) {
      newSelected.delete(skillName);
    } else {
      newSelected.add(skillName);
    }
    setSelected(newSelected);
  };

  const handleSubmit = () => {
    onConfirm(Array.from(selected));
    setSelected(new Set());
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Choose Your Skills</h2>
        <p className="text-slate-400 mt-1">
          {`Select the skills you already know from the "${category.category}"`}
          category.
        </p>
      </div>
      <div className="space-y-3">
        {category.skills.map((skill) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            variant="selectable"
            isSelected={selected.has(skill.name)}
            onClick={() => handleSelect(skill.name)}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-500 transition-colors duration-200 disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? <LoadingSpinner /> : 'Confirm Skills & Continue'}
      </button>
    </div>
  );
};

export default SkillSelector;
