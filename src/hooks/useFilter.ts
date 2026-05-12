import { useState, useMemo } from 'react';
import { Board, Column } from '../types';
import { isOverdue } from '../utils/dateUtils';
import { isToday, isThisWeek, parseISO } from 'date-fns';

export interface FilterState {
  searchQuery: string;
  assignees: string[];
  labels: string[];
  dateRange: 'all' | 'overdue' | 'today' | 'this_week';
}

export const useFilter = (board: Board) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    assignees: [],
    labels: [],
    dateRange: 'all'
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      assignees: [],
      labels: [],
      dateRange: 'all'
    });
  };

  const filteredColumns = useMemo(() => {
    return board.columns.map(col => {
      const filteredTasks = col.tasks.filter(task => {
        // Search filter
        if (filters.searchQuery && !task.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
          return false;
        }

        // Assignees filter
        if (filters.assignees.length > 0 && !task.assignees.some(a => filters.assignees.includes(a))) {
          return false;
        }

        // Labels filter
        if (filters.labels.length > 0 && !filters.labels.includes(task.label)) {
          return false;
        }

        // Date range filter
        if (filters.dateRange !== 'all') {
          if (!task.dueDate) return false;
          
          if (filters.dateRange === 'overdue' && !isOverdue(task.dueDate)) {
            return false;
          }
          if (filters.dateRange === 'today') {
            const date = parseISO(task.dueDate);
            if (!isToday(date)) return false;
          }
          if (filters.dateRange === 'this_week') {
            const date = parseISO(task.dueDate);
            if (!isThisWeek(date)) return false;
          }
        }

        return true;
      });

      return { ...col, tasks: filteredTasks } as Column;
    });
  }, [board, filters]);

  return { filters, updateFilter, clearFilters, filteredColumns };
};
