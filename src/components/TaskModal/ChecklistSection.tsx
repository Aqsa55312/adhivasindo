import React, { useState } from 'react';
import { CheckSquare, Trash2, Plus } from 'lucide-react';
import { ChecklistItem } from '../../types';
import { ProgressBar } from '../shared/ProgressBar';
import { generateId } from '../../utils/generateId';

interface ChecklistSectionProps {
  items: ChecklistItem[];
  onChange: (items: ChecklistItem[]) => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({ items, onChange }) => {
  const [newItemText, setNewItemText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const completedCount = items.filter(i => i.completed).length;

  const handleToggle = (id: string) => {
    onChange(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const handleDelete = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  const handleUpdateText = (id: string, text: string) => {
    onChange(items.map(i => i.id === id ? { ...i, text } : i));
  };

  const handleAdd = () => {
    if (!newItemText.trim()) return;
    onChange([...items, { id: generateId(), text: newItemText.trim(), completed: false }]);
    setNewItemText('');
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') {
      setIsAdding(false);
      setNewItemText('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-slate-800 font-semibold mb-2">
        <CheckSquare size={18} className="text-slate-500" />
        <h3>Checklist</h3>
      </div>

      <div className="mb-4">
        <ProgressBar completed={completedCount} total={items.length} />
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-start gap-3 group">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id)}
              className="mt-1 rounded border-slate-300 text-primary-action focus:ring-primary-action cursor-pointer w-4 h-4"
            />
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleUpdateText(item.id, e.target.value)}
              className={`flex-1 text-sm border-transparent hover:bg-slate-50 focus:bg-white focus:border-primary-action focus:ring-1 focus:ring-primary-action rounded px-2 py-1 transition-colors ${
                item.completed ? 'line-through text-slate-500' : 'text-slate-700'
              }`}
            />
            <button
              onClick={() => handleDelete(item.id)}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all mt-0.5"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="mt-3">
          <input
            type="text"
            autoFocus
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an item..."
            className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-primary-action focus:ring focus:ring-primary-action/20 mb-2"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              className="px-3 py-1.5 bg-primary-action text-white text-sm font-medium rounded hover:bg-primary-action/90 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewItemText(''); }}
              className="px-3 py-1.5 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors w-fit mt-3"
        >
          <Plus size={16} />
          Add subtask
        </button>
      )}
    </div>
  );
};
