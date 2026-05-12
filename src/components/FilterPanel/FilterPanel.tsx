import React from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../../hooks/useFilter';
import { TaskLabel } from '../../types';
import { SEED_MEMBERS } from '../../assets/seed';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  clearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  isOpen, 
  onClose, 
  filters, 
  updateFilter, 
  clearFilters 
}) => {
  if (!isOpen) return null;

  const labels: TaskLabel[] = ['Feature', 'Bug', 'Issue', 'Undefined'];

  const handleLabelToggle = (label: string) => {
    if (filters.labels.includes(label)) {
      updateFilter('labels', filters.labels.filter(l => l !== label));
    } else {
      updateFilter('labels', [...filters.labels, label]);
    }
  };

  const handleAssigneeToggle = (id: string) => {
    if (filters.assignees.includes(id)) {
      updateFilter('assignees', filters.assignees.filter(a => a !== id));
    } else {
      updateFilter('assignees', [...filters.assignees, id]);
    }
  };

  return (
    <div className="absolute top-16 right-0 sm:right-6 w-full sm:w-80 bg-white shadow-xl rounded-b-lg sm:rounded-lg border border-slate-200 z-30 animate-fade-in-up">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Filters</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Due Date Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-700">Due Date</h4>
          <select 
            value={filters.dateRange}
            onChange={(e) => updateFilter('dateRange', e.target.value)}
            className="w-full text-sm border-slate-200 rounded-md shadow-sm focus:border-primary-action focus:ring focus:ring-primary-action/20"
          >
            <option value="all">Any time</option>
            <option value="today">Today</option>
            <option value="this_week">This week</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Labels Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-700">Labels</h4>
          <div className="flex flex-wrap gap-2">
            {labels.map(label => (
              <button
                key={label}
                onClick={() => handleLabelToggle(label)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                  filters.labels.includes(label)
                    ? 'bg-primary-action text-white border-primary-action'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Assignees Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-700">Assignees</h4>
          <div className="space-y-2">
            {SEED_MEMBERS.map(member => (
              <label key={member.id} className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-50 rounded">
                <input
                  type="checkbox"
                  checked={filters.assignees.includes(member.id)}
                  onChange={() => handleAssigneeToggle(member.id)}
                  className="rounded border-slate-300 text-primary-action focus:ring-primary-action"
                />
                <div className="flex items-center gap-2">
                  <img src={member.avatarUrl} alt={member.name} className="w-6 h-6 rounded-full" />
                  <span className="text-sm text-slate-700">{member.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-lg">
        <button
          onClick={clearFilters}
          className="w-full py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
};
