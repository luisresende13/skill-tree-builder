import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface KnowledgeBaseProps {
  skills: string[];
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ skills }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-300 mb-3 flex items-center">
        <CheckIcon />
        <span className="ml-2">Knowledge Base</span>
      </h2>
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 italic">
          Your known skills will appear here.
        </p>
      )}
    </div>
  );
};

export default KnowledgeBase;
