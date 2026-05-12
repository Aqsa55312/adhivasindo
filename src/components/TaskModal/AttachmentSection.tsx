import React from 'react';
import { Paperclip, Plus, Trash2 } from 'lucide-react';
import { Attachment } from '../../types';

interface AttachmentSectionProps {
  attachments: Attachment[];
  onAddAttachment: (attachment: Attachment) => void;
  onRemoveAttachment: (id: string) => void;
}

export const AttachmentSection: React.FC<AttachmentSectionProps> = ({
  attachments,
  onAddAttachment,
  onRemoveAttachment
}) => {
  const handleDummyAdd = () => {
    const fileTypes = ['pdf', 'image', 'document'];
    const randomType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    
    onAddAttachment({
      id: `att-${Date.now()}`,
      fileName: `dummy_file_${Math.floor(Math.random() * 100)}.${randomType === 'image' ? 'png' : randomType}`,
      fileType: randomType,
      size: `${Math.floor(Math.random() * 500) + 10}KB`
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-slate-800 font-semibold">
        <Paperclip size={18} className="text-slate-500" />
        <h3>Attachments</h3>
      </div>

      <div className="space-y-3">
        {attachments.map(att => (
          <div key={att.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg group">
            <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center shrink-0 text-slate-500 font-bold uppercase text-xs">
              {att.fileType.substring(0, 3)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{att.fileName}</p>
              <p className="text-xs text-slate-500">{att.size}</p>
            </div>
            <button 
              onClick={() => onRemoveAttachment(att.id)}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleDummyAdd}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors w-fit"
      >
        <Plus size={16} />
        Add attachment
      </button>
    </div>
  );
};
