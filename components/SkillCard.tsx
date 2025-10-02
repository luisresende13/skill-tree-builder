import React from 'react';
import { Skill, ApiSkill } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { CheckIcon } from './icons/CheckIcon';

type SkillCardProps = {
  skill: Skill | ApiSkill;
  variant?: 'selectable' | 'learning' | 'known-tree' | 'learning-tree';
  isSelected?: boolean;
  onClick?: () => void;
};

const SkillCard: React.FC<SkillCardProps> = ({ skill, variant = 'selectable', isSelected = false, onClick }) => {
  const baseClasses = 'p-4 rounded-lg border-2 transition-all duration-200';
  const variantClasses = {
    selectable: `bg-slate-800/50 border-slate-700 hover:border-emerald-500 hover:bg-slate-800 ${isSelected ? '!border-emerald-500 !bg-emerald-900/30' : ''} ${onClick ? 'cursor-pointer' : ''}`,
    learning: 'bg-amber-900/20 border-amber-800/50',
    'known-tree': 'bg-green-900/30 border-green-500/50',
    'learning-tree': 'bg-slate-800 border-dashed border-slate-600 opacity-70',
  };

  const icon = {
    selectable: isSelected ? <CheckIcon /> : <PlusIcon />,
    learning: null,
    'known-tree': null,
    'learning-tree': null,
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-white">{skill.name}</h3>
          <p className="text-sm text-slate-400 mt-1">{skill.description}</p>
        </div>
        {variant === 'selectable' && (
          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ml-4 ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
            {icon[variant]}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
