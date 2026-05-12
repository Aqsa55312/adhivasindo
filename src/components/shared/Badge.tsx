import React from 'react';
import { TaskLabel, TaskPriority } from '../../types';

import { twMerge } from 'tailwind-merge';

interface LabelBadgeProps {
  label: TaskLabel;
  className?: string;
}

export const LabelBadge: React.FC<LabelBadgeProps> = ({ label, className }) => {
  const colorMap: Record<TaskLabel, string> = {
    Feature: 'bg-label-feature/10 text-label-feature',
    Bug: 'bg-label-bug/10 text-label-bug',
    Issue: 'bg-label-issue/10 text-label-issue',
    Undefined: 'bg-label-undefined/10 text-label-undefined'
  };

  return (
    <span className={twMerge(
      "px-2 py-1 rounded text-xs font-semibold whitespace-nowrap",
      colorMap[label],
      className
    )}>
      {label}
    </span>
  );
};

interface PriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  if (!priority) return null;

  const colorMap: Record<string, string> = {
    High: 'bg-priority-high/10 text-priority-high border border-priority-high/20',
    Medium: 'bg-priority-medium/10 text-priority-medium border border-priority-medium/20',
    Low: 'bg-priority-low/10 text-priority-low border border-priority-low/20',
  };

  return (
    <span className={twMerge(
      "px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider",
      colorMap[priority],
      className
    )}>
      {priority}
    </span>
  );
};
