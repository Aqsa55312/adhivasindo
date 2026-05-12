import React, { useState, useEffect } from 'react';
import { X, Calendar, AlignLeft, Layout, Tag, AlertCircle, Trash2, Check, Image as ImageIcon, ImageOff } from 'lucide-react';
import { Task, Column, Board, TaskLabel, TaskPriority } from '../../types';
import { AttachmentSection } from './AttachmentSection';
import { ChecklistSection } from './ChecklistSection';
import { SEED_MEMBERS } from '../../assets/seed';
import { formatModalDate } from '../../utils/dateUtils';
import { generateId } from '../../utils/generateId';

interface TaskModalProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  columns: Column[];
  board: Board;
  defaultColumnId?: string;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
  onDelete,
  columns,
  board,
  defaultColumnId
}) => {
  const isEditing = !!task;

  const [formData, setFormData] = useState<Task>({
    id: '',
    columnId: defaultColumnId || (columns[0]?.id || ''),
    title: '',
    description: '',
    assignees: [],
    dueDate: '',
    label: 'Undefined',
    priority: null,
    checklist: [],
    attachments: [],
    coverImage: null,
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setFormData({ ...task });
      } else {
        setFormData({
          id: generateId(),
          columnId: defaultColumnId || (columns[0]?.id || ''),
          title: '',
          description: '',
          assignees: [],
          dueDate: '',
          label: 'Undefined',
          priority: null,
          checklist: [],
          attachments: [],
          coverImage: null,
          createdAt: new Date().toISOString()
        });
      }
    }
  }, [isOpen, task, defaultColumnId, columns]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    onSave(formData);
  };

  const handleDelete = () => {
    if (isEditing && onDelete) {
      if (window.confirm('Are you sure you want to delete this task?')) {
        onDelete(task.id);
      }
    }
  };

  const handleAddCover = () => {
    const url = prompt('Enter image URL (or leave empty for random):');
    if (url !== null) {
      setFormData(prev => ({ 
        ...prev, 
        coverImage: url || `https://picsum.photos/seed/${prev.id}/800/300` 
      }));
    }
  };

  const labels: TaskLabel[] = ['Feature', 'Bug', 'Issue', 'Undefined'];
  const priorities: TaskPriority[] = ['High', 'Medium', 'Low', null];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-full animate-fade-in-up">
        {formData.coverImage && (
          <div className="relative w-full h-32 sm:h-40 shrink-0 group">
            <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
            <button 
              onClick={() => setFormData(prev => ({ ...prev, coverImage: null }))}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur hover:bg-white text-slate-700 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 text-sm font-medium"
            >
              <ImageOff size={16} /> Remove Cover
            </button>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* LEFT PANEL */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-primary-action hover:bg-primary-action/90 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm"
                >
                  <Check size={16} />
                  {isEditing ? 'Save Changes' : 'Create Task'}
                </button>
                {!formData.coverImage && (
                  <button 
                    onClick={handleAddCover}
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-md font-medium text-sm transition-colors"
                  >
                    <ImageIcon size={16} />
                    Cover
                  </button>
                )}
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors md:hidden">
                <X size={20} />
              </button>
            </div>

            <textarea
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Task title..."
              className="w-full text-2xl font-bold text-slate-800 placeholder:text-slate-300 border-none focus:ring-0 resize-none p-0 bg-transparent mb-6 h-auto min-h-[40px]"
              rows={1}
              style={{ overflow: 'hidden' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
              {/* Board */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                  <Layout size={14} /> Board
                </label>
                <div className="text-sm font-medium text-slate-700 px-2 py-1 bg-slate-50 rounded border border-slate-100">
                  {board.name}
                </div>
              </div>

              {/* Column */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                  <Layout size={14} /> List
                </label>
                <select
                  value={formData.columnId}
                  onChange={(e) => setFormData(prev => ({ ...prev, columnId: e.target.value }))}
                  className="w-full text-sm font-medium text-slate-700 bg-slate-50 border-slate-200 rounded-md focus:border-primary-action focus:ring focus:ring-primary-action/20"
                >
                  {columns.map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>

              {/* Label */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                  <Tag size={14} /> Label
                </label>
                <select
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value as TaskLabel }))}
                  className="w-full text-sm font-medium text-slate-700 bg-slate-50 border-slate-200 rounded-md focus:border-primary-action focus:ring focus:ring-primary-action/20"
                >
                  {labels.map(label => (
                    <option key={label} value={label}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                  <AlertCircle size={14} /> Priority
                </label>
                <select
                  value={formData.priority || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value ? (e.target.value as TaskPriority) : null }))}
                  className="w-full text-sm font-medium text-slate-700 bg-slate-50 border-slate-200 rounded-md focus:border-primary-action focus:ring focus:ring-primary-action/20"
                >
                  <option value="">None</option>
                  {priorities.filter(Boolean).map(priority => (
                    <option key={priority} value={priority!}>{priority}</option>
                  ))}
                </select>
              </div>

              {/* Due Date */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                  <Calendar size={14} /> Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate ? formatModalDate(formData.dueDate) : ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' }))}
                  className="w-full text-sm font-medium text-slate-700 bg-slate-50 border-slate-200 rounded-md focus:border-primary-action focus:ring focus:ring-primary-action/20"
                />
              </div>

              {/* Assignees */}
              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                  Assignees
                </label>
                <div className="flex flex-wrap gap-2">
                  {SEED_MEMBERS.map(member => {
                    const isSelected = formData.assignees.includes(member.id);
                    return (
                      <button
                        key={member.id}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            assignees: isSelected 
                              ? prev.assignees.filter(id => id !== member.id)
                              : [...prev.assignees, member.id]
                          }));
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                          isSelected 
                            ? 'bg-primary-action/10 border-primary-action/30 text-primary-action' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <img src={member.avatarUrl} alt={member.name} className="w-5 h-5 rounded-full" />
                        {member.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <label className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <AlignLeft size={20} className="text-slate-500" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Add a more detailed description..."
                className="w-full text-sm text-slate-700 bg-slate-50 border-slate-200 hover:bg-slate-100 focus:bg-white rounded-lg focus:border-primary-action focus:ring focus:ring-primary-action/20 min-h-[120px] p-3 transition-colors resize-y"
              />
            </div>
            
            <div className="flex md:hidden flex-col gap-8 mb-8">
               <AttachmentSection 
                attachments={formData.attachments} 
                onAddAttachment={(att) => setFormData(prev => ({ ...prev, attachments: [...prev.attachments, att] }))}
                onRemoveAttachment={(id) => setFormData(prev => ({ ...prev, attachments: prev.attachments.filter(a => a.id !== id) }))}
              />
              <ChecklistSection 
                items={formData.checklist}
                onChange={(items) => setFormData(prev => ({ ...prev, checklist: items }))}
              />
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="w-full md:w-80 lg:w-96 bg-slate-50/50 border-l border-slate-200 p-6 md:p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar hidden md:flex">
            <div className="flex justify-end">
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <ChecklistSection 
              items={formData.checklist}
              onChange={(items) => setFormData(prev => ({ ...prev, checklist: items }))}
            />

            <AttachmentSection 
              attachments={formData.attachments} 
              onAddAttachment={(att) => setFormData(prev => ({ ...prev, attachments: [...prev.attachments, att] }))}
              onRemoveAttachment={(id) => setFormData(prev => ({ ...prev, attachments: prev.attachments.filter(a => a.id !== id) }))}
            />

            {isEditing && onDelete && (
              <div className="mt-auto pt-8 border-t border-slate-200">
                <button 
                  onClick={handleDelete}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
