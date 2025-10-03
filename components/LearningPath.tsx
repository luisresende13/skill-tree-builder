import React from 'react';
import { Skill } from '../types';
import SkillCard from './SkillCard';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface LearningPathProps {
  skills: Skill[];
}

const LearningPath: React.FC<LearningPathProps> = ({ skills }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-300 mb-3 flex items-center">
        <BookOpenIcon />
        <span className="ml-2">Learning Path</span>
      </h2>
      {skills.length > 0 ? (
        <div className="space-y-3">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} variant="learning" />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 italic">
          Your path will be revealed as you make selections.
        </p>
      )}
    </div>
  );
};

export default LearningPath;
