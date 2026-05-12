import { format, isPast, isToday, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, 'MMM dd, yyyy');
};

export const isOverdue = (dateString: string): boolean => {
  if (!dateString) return false;
  const date = parseISO(dateString);
  return isPast(date) && !isToday(date);
};

export const formatModalDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, 'yyyy-MM-dd');
};
