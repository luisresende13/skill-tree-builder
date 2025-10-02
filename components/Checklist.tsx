
import React from 'react';
import { ChecklistData } from '../types';

interface ChecklistProps {
  checklist: ChecklistData;
  onChecklistChange: (itemName: string, isChecked: boolean) => void;
  disabled: boolean;
}

const Checklist: React.FC<ChecklistProps> = ({ checklist, onChecklistChange, disabled }) => {
  return (
    <div className="mt-4 border-t border-slate-700 pt-4">
      <h3 className="font-semibold text-lg text-indigo-400 mb-3">{checklist.category}</h3>
      <div className="space-y-2">
        {checklist.items.map((item) => (
          <label
            key={item.name}
            className={`flex items-center p-3 rounded-md transition-colors duration-200 ${
              disabled ? 'cursor-not-allowed bg-slate-800' : 'cursor-pointer bg-slate-700/50 hover:bg-slate-700'
            }`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => onChecklistChange(item.name, e.target.checked)}
              disabled={disabled}
              className="h-5 w-5 rounded bg-slate-800 border-slate-500 text-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
            />
            <span className={`ml-3 text-slate-300 ${disabled ? 'opacity-60' : ''}`}>{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
