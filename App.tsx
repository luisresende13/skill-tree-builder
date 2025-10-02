import React, { useState } from 'react';
import Header from './components/Header';
import KnowledgeBase from './components/KnowledgeBase';
import LearningPath from './components/LearningPath';
import SkillSelector from './components/SkillSelector';
import SkillTree from './components/SkillTree';
import LoadingSpinner from './components/LoadingSpinner';
import { useSkillTree } from './hooks/useSkillTree';
import DomainSelector from './components/DomainSelector';

const App: React.FC = () => {
  const [domain, setDomain] = useState<string | null>(null);

  const handleDomainsSelected = (domains: string[]) => {
    if (domains.length > 0) {
      setDomain(domains.join(', '));
    }
  };

  if (!domain) {
    return <DomainSelector onStart={handleDomainsSelected} />;
  }

  return <MainApp domain={domain} />;
};

const MainApp = ({ domain }: { domain: string }) => {
  const {
    tree,
    knownSkills,
    learningSkills,
    currentCategory,
    isLoading,
    handleConfirmSelection,
    isComplete,
  } = useSkillTree(domain);

  return (
    <div className="flex flex-col h-screen font-sans bg-slate-900 text-slate-300">
      <Header domain={domain} />
      <div className="grid grid-cols-1 md:grid-cols-4 flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="col-span-1 bg-slate-950/50 border-r border-slate-800 flex flex-col overflow-y-auto p-4 space-y-6">
          <KnowledgeBase skills={knownSkills} />
          <LearningPath skills={learningSkills} />
        </aside>

        {/* Main Content */}
        <main className="col-span-1 md:col-span-2 flex-1 overflow-y-auto p-6">
          <SkillTree skills={tree} domain={domain} />
        </main>

        {/* Right Sidebar */}
        <aside className="col-span-1 bg-slate-950/50 border-l border-slate-800 flex flex-col overflow-y-auto p-6">
          {isLoading && !currentCategory && (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner />
            </div>
          )}
          {currentCategory && (
            <SkillSelector
              category={currentCategory}
              onConfirm={handleConfirmSelection}
              isLoading={isLoading}
            />
          )}
          {isComplete && (
            <div className="text-center p-8 bg-slate-800/50 rounded-lg">
              <h2 className="text-2xl font-bold text-green-400">Congratulations!</h2>
              <p className="mt-2 text-slate-400">You've explored the main branches of this skill tree. Check your Learning Path for next steps!</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default App;
