
import React, { useState } from 'react';
import { SendIcon } from './icons/SendIcon';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={isLoading ? "Waiting for response..." : "Type your answer here..."}
        disabled={isLoading}
        className="flex-1 bg-slate-800 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-indigo-600 text-white p-3 rounded-lg disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        aria-label="Send message"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default InputBar;
