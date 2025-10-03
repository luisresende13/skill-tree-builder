import React from 'react';
import { BotIcon } from './icons/BotIcon';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 animate-pulse">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
        <BotIcon />
      </div>
      <div className="bg-slate-800 rounded-xl rounded-tl-none px-4 py-3 max-w-sm">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
