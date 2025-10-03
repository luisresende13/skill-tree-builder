import React, { useState, useMemo } from 'react';
import { DOMAIN_CATEGORIES } from '../constants';
import { MapIcon } from './icons/MapIcon';
import { SearchIcon } from './icons/SearchIcon';
import { XIcon } from './icons/XIcon';

interface DomainSelectorProps {
  onStart: (domains: string[]) => void;
}

const DomainSelector: React.FC<DomainSelectorProps> = ({ onStart }) => {
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(
    new Set(),
  );
  const [customDomainInput, setCustomDomainInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleDomain = (domain: string) => {
    setSelectedDomains((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(domain)) {
        newSet.delete(domain);
      } else {
        newSet.add(domain);
      }
      return newSet;
    });
  };

  const handleAddCustomDomain = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = customDomainInput.trim();
    if (trimmedInput && !selectedDomains.has(trimmedInput)) {
      handleToggleDomain(trimmedInput);
    }
    setCustomDomainInput('');
  };

  const filteredDomains = useMemo(() => {
    if (!searchTerm) {
      return DOMAIN_CATEGORIES;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    // FIX: `result` is initialized as an empty object but was typed as `typeof DOMAIN_CATEGORIES` which expects properties to exist.
    // Changed to `Partial<typeof DOMAIN_CATEGORIES>` which makes all properties optional, allowing for an empty object.
    const result: Partial<typeof DOMAIN_CATEGORIES> = {};
    for (const category in DOMAIN_CATEGORIES) {
      const filtered = DOMAIN_CATEGORIES[
        category as keyof typeof DOMAIN_CATEGORIES
      ].filter((domain) => domain.toLowerCase().includes(lowercasedFilter));
      if (filtered.length > 0) {
        result[category as keyof typeof DOMAIN_CATEGORIES] = filtered;
      }
    }
    return result;
  }, [searchTerm]);

  const selectedArray = Array.from(selectedDomains);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <MapIcon />
          <h1 className="text-4xl font-extrabold text-white mt-4">
            Choose Your Domain(s)
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            Select one or more areas of interest to start building your skill
            map. You can also add your own custom domains.
          </p>
        </div>

        {/* Search and Custom Input */}
        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm py-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon />
              </div>
            </div>
            <form onSubmit={handleAddCustomDomain} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a custom domain..."
                value={customDomainInput}
                onChange={(e) => setCustomDomainInput(e.target.value)}
                className="flex-grow bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white font-semibold px-4 rounded-lg hover:bg-emerald-500 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed"
                disabled={!customDomainInput.trim()}
              >
                Add
              </button>
            </form>
          </div>
          {/* Selected Domains */}
          {selectedArray.length > 0 && (
            <div className="mt-4 p-3 bg-slate-950/50 rounded-lg">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-slate-400 mr-2">
                  Selected:
                </span>
                {selectedArray.map((domain) => (
                  <span
                    key={domain}
                    className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {domain}
                    <button
                      onClick={() => handleToggleDomain(domain)}
                      className="text-emerald-400/70 hover:text-emerald-400"
                    >
                      <XIcon />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Domain List */}
        <div className="space-y-6">
          {Object.entries(filteredDomains).map(([category, domains]) => (
            <div key={category}>
              <h3 className="text-xl font-bold text-slate-300 border-b-2 border-slate-800 pb-2 mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {domains && (domains as string[]).map((domain) => {
                  const isSelected = selectedDomains.has(domain);
                  return (
                    <button
                      key={domain}
                      onClick={() => handleToggleDomain(domain)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 border-2 ${
                        isSelected
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'bg-slate-800 border-slate-700 hover:border-emerald-600 text-slate-300'
                      }`}
                    >
                      {domain}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(filteredDomains).length === 0 && searchTerm && (
          <div className="text-center py-10">
            <p className="text-slate-400">
              {`No domains found for "${searchTerm}".`}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              You can add it as a custom domain above.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onStart(Array.from(selectedDomains))}
            disabled={selectedDomains.size === 0}
            className="bg-emerald-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-emerald-500 transition-colors duration-200 disabled:bg-slate-700 disabled:cursor-not-allowed transform hover:scale-105"
          >
            Start Building Skill Tree ({selectedDomains.size})
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainSelector;
