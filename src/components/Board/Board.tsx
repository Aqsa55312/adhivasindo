import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { Column as ColumnComponent } from '../Column/Column';
import { Column, Task } from '../../types';

interface BoardProps {
  columns: Column[];
  onDragEnd: (result: DropResult) => void;
  onAddTask: (columnId: string) => void;
  onTaskClick: (task: Task) => void;
  onAddColumn: (title: string) => void;
}

export const Board: React.FC<BoardProps> = ({ 
  columns, 
  onDragEnd, 
  onAddTask, 
  onTaskClick,
  onAddColumn
}) => {
  const handleAddColumnClick = () => {
    const title = prompt('Enter new column title:');
    if (title && title.trim()) {
      onAddColumn(title.trim());
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar bg-board p-6">
        <div className="flex items-start gap-6 h-full min-w-max pb-4">
          {columns.map(column => (
            <ColumnComponent 
              key={column.id} 
              column={column} 
              onAddTask={onAddTask} 
              onTaskClick={onTaskClick} 
            />
          ))}
          
          <button 
            onClick={handleAddColumnClick}
            className="w-[280px] min-w-[280px] shrink-0 flex items-center gap-2 bg-white/40 hover:bg-white/60 text-slate-600 font-medium p-4 rounded-xl transition-all duration-200 border border-slate-300 border-dashed hover:border-slate-400 hover:shadow-sm"
          >
            <Plus size={20} />
            <span>Add new List</span>
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};
