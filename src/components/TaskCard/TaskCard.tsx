import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, CheckSquare, Paperclip } from 'lucide-react';
import { Task } from '../../types';
import { LabelBadge, PriorityBadge } from '../shared/Badge';
import { AvatarGroup } from '../shared/Avatar';
import { formatDate } from '../../utils/dateUtils';
import { SEED_MEMBERS } from '../../assets/seed';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onClick }) => {
  const completedChecklist = task.checklist.filter(item => item.completed).length;
  const totalChecklist = task.checklist.length;
  const hasChecklist = totalChecklist > 0;
  const hasAttachments = task.attachments.length > 0;

  const assignees = task.assignees
    .map(id => SEED_MEMBERS.find(m => m.id === id))
    .filter(Boolean) as { id: string; name: string; avatarUrl: string }[];

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(task)}
          className={`group bg-card rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-200 ${
            snapshot.isDragging ? 'opacity-90 rotate-2 scale-105 shadow-xl' : 'animate-fade-in-up'
          }`}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          {task.coverImage && (
            <div className="h-32 w-full -mx-3 -mt-3 mb-3 rounded-t-lg overflow-hidden">
              <img src={task.coverImage} alt="Cover" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-start justify-between mb-2">
            <LabelBadge label={task.label} />
            {task.priority && <PriorityBadge priority={task.priority} />}
          </div>

          <h3 className="font-semibold text-sm text-slate-800 mb-2 line-clamp-2 leading-tight">
            {task.title}
          </h3>

          {task.dueDate && (
            <div className="flex items-center text-xs text-slate-500 mb-3 gap-1">
              <Calendar size={14} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center gap-3 text-slate-500">
              {hasChecklist && (
                <div className={`flex items-center gap-1 text-xs ${completedChecklist === totalChecklist ? 'text-green-600 bg-green-50 px-1.5 py-0.5 rounded' : ''}`}>
                  <CheckSquare size={14} />
                  <span>{completedChecklist}/{totalChecklist}</span>
                </div>
              )}
              {hasAttachments && (
                <div className="flex items-center gap-1 text-xs">
                  <Paperclip size={14} />
                  <span>{task.attachments.length}</span>
                </div>
              )}
            </div>

            <AvatarGroup assignees={assignees} size="sm" max={3} />
          </div>
        </div>
      )}
    </Draggable>
  );
};
