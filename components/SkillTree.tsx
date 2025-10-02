import React, { useMemo } from 'react';
import { Skill } from '../types';
import SkillCard from './SkillCard';

interface SkillTreeProps {
  skills: Skill[];
  domain: string;
}

const SkillTree: React.FC<SkillTreeProps> = ({ skills, domain }) => {

  const groupedSkills = useMemo(() => {
    const groups = new Map<string, Skill[]>();
    // Ensure the root group always exists
    groups.set(domain, []);

    skills.forEach(skill => {
      const key = skill.prerequisite || domain;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(skill);
    });
    return groups;
  }, [skills, domain]);

  const knownSkillsSet = useMemo(() => new Set(skills.filter(s => s.status === 'known').map(s => s.name)), [skills]);
  
  const renderGroup = (prerequisite: string, level = 0) => {
    const children = groupedSkills.get(prerequisite) || [];
    
    return (
      <div key={prerequisite} style={{ marginLeft: level * 16 }} className="relative">
        {level > 0 && (
          <div className="absolute left-[-24px] top-[26px] h-[calc(100%-26px)] w-px bg-slate-700"></div>
        )}
        {children.map((skill, index) => (
          <div key={skill.name} className="mt-4">
            <div className="relative">
              <div className="absolute left-[-24px] top-[26px] h-px w-6 bg-slate-700"></div>
              <SkillCard
                skill={skill}
                variant={skill.status === 'known' ? 'known-tree' : 'learning-tree'}
              />
            </div>
            {/* Recursively render children if this skill is known */}
            {knownSkillsSet.has(skill.name) && renderGroup(skill.name, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Your Skill Tree</h2>
      {skills.length > 0 ? (
        renderGroup(domain)
      ) : (
        <div className="text-center py-10 px-6 bg-slate-800/50 rounded-lg border border-dashed border-slate-700">
            <p className="text-slate-400">Your skill tree will grow here as you make selections.</p>
            <p className="text-sm text-slate-500 mt-2">Start by choosing your skills on the right!</p>
        </div>
      )}
    </div>
  );
};

export default SkillTree;
