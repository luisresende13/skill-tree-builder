import React from 'react';

interface HeaderProps {
  domain: string;
}

const Header: React.FC<HeaderProps> = ({ domain }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-emerald-500 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Skill Tree Builder</h1>
          <p className="text-sm text-slate-400">Visually map your technical skills.</p>
        </div>
      </div>
       <div className="hidden sm:block px-3 py-1 bg-slate-800 rounded-full text-sm font-medium text-emerald-400">
        Domain: {domain}
      </div>
    </header>
  );
};

export default Header;
