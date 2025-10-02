
import React from 'react';
import { ChatMessageData, ChecklistData } from '../types';
import Checklist from './Checklist';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface ChatMessageProps {
  message: ChatMessageData;
  isLastModelMessage: boolean;
  currentChecklist: ChecklistData | null;
  onChecklistChange: (itemName: string, isChecked: boolean) => void;
  isLoading: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastModelMessage, currentChecklist, onChecklistChange, isLoading }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-indigo-600 rounded-xl rounded-tr-none px-4 py-3 max-w-lg">
          <p className="text-white whitespace-pre-wrap">{message.text}</p>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <UserIcon />
        </div>
      </div>
    );
  }

  // Model's message
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
        <BotIcon />
      </div>
      <div className="bg-slate-800 rounded-xl rounded-tl-none px-4 py-3 max-w-lg space-y-4">
        <p className="text-slate-300 whitespace-pre-wrap">{message.text}</p>
        {message.summary && (
          <div className="border-l-4 border-amber-500 pl-3 text-amber-300 text-sm italic">
            {message.summary}
          </div>
        )}
        {isLastModelMessage && currentChecklist ? (
          <Checklist
            checklist={currentChecklist}
            onChecklistChange={onChecklistChange}
            disabled={isLoading}
          />
        ) : message.checklist && message.checklist.items.length > 0 ? (
          // Render a disabled version for past messages
          <Checklist
            checklist={message.checklist}
            onChecklistChange={() => {}}
            disabled={true}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ChatMessage;
