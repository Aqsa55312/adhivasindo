import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  stacked?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ name, avatarUrl, size = 'md', className, stacked }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const baseClasses = 'relative inline-flex items-center justify-center rounded-full border-2 border-white bg-slate-200 text-slate-600 font-medium overflow-hidden';
  const stackedClasses = stacked ? '-ml-2 ring-2 ring-white first:ml-0' : '';

  return (
    <div
      className={twMerge(clsx(baseClasses, sizeClasses[size], stackedClasses), className)}
      title={name}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<{
  assignees: { id: string; name: string; avatarUrl?: string }[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ assignees, max = 3, size = 'md', className }) => {
  const visibleAssignees = assignees.slice(0, max);
  const remaining = assignees.length - max;

  return (
    <div className={twMerge("flex items-center", className)}>
      {visibleAssignees.map(a => (
        <Avatar key={a.id} name={a.name} avatarUrl={a.avatarUrl} size={size} stacked />
      ))}
      {remaining > 0 && (
        <div className={twMerge(
          "relative inline-flex items-center justify-center rounded-full border-2 border-white bg-slate-100 text-slate-600 font-medium -ml-2",
          size === 'sm' ? 'w-6 h-6 text-[10px]' : size === 'md' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
        )}>
          +{remaining}
        </div>
      )}
    </div>
  );
};
