import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Column as ColumnType, Task } from '../../types';
import { TaskCard } from '../TaskCard/TaskCard';

interface ColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string) => void;
  onTaskClick: (task: Task) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, onAddTask, onTaskClick }) => {
  return (
    <div className="w-[280px] min-w-[280px] flex flex-col bg-column rounded-xl max-h-[calc(100vh-120px)] shadow-sm animate-slide-in-right shrink-0">
      <div className="p-3 flex items-center justify-between border-b border-slate-200/60 bg-white/50 rounded-t-xl sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-slate-700 text-sm">{column.title}</h2>
          <span className="bg-slate-200 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <button 
            onClick={() => onAddTask(column.id)}
            className="p-1 hover:bg-slate-200 rounded transition-colors hover:text-slate-700"
            title="Add task"
          >
            <Plus size={16} />
          </button>
          <button className="p-1 hover:bg-slate-200 rounded transition-colors hover:text-slate-700">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 overflow-y-auto custom-scrollbar transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-slate-200/50' : ''
            }`}
          >
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onClick={onTaskClick} />
            ))}
            {provided.placeholder}
            
            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="text-center p-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-sm">
                No tasks yet
              </div>
            )}
          </div>
        )}
      </Droppable>

      <div className="p-3 border-t border-slate-200/60 bg-white/30 rounded-b-xl sticky bottom-0">
        <button 
          onClick={() => onAddTask(column.id)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium w-full p-2 hover:bg-slate-200/50 rounded transition-colors"
        >
          <Plus size={16} />
          <span>Add a task</span>
        </button>
      </div>
    </div>
  );
};
