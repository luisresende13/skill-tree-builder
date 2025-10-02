import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
       <div className="relative h-12 w-12">
        <div className="absolute h-full w-full border-4 border-t-emerald-500 border-slate-700 rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-400 text-sm">Building next branch...</p>
    </div>
  );
};

export default LoadingSpinner;
