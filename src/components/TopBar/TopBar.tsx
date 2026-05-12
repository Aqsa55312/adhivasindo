import React from 'react';
import { Search, SlidersHorizontal, Share2, Plus, ChevronDown } from 'lucide-react';
import { AvatarGroup } from '../shared/Avatar';
import { SEED_MEMBERS } from '../../assets/seed';

interface TopBarProps {
  boardName: string;
  onFilterToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  boardName, 
  onFilterToggle, 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded transition-colors">
          <div className="w-8 h-8 bg-primary-action rounded flex items-center justify-center text-white font-bold">
            A
          </div>
          <h1 className="font-bold text-lg text-slate-800">{boardName}</h1>
          <ChevronDown size={16} className="text-slate-500" />
        </div>
        
        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
        
        <div className="hidden md:flex items-center gap-3">
          <AvatarGroup assignees={SEED_MEMBERS} max={4} />
          <button className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-slate-300 text-slate-500 hover:text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition-colors">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-1.5 bg-slate-100 border-transparent focus:bg-white focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 rounded-md text-sm w-48 lg:w-64 transition-all"
          />
        </div>
        
        <button 
          onClick={onFilterToggle}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filter</span>
        </button>
        
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-md transition-colors">
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};
