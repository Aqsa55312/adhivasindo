import { useState, useEffect } from 'react';
import { Board, Task, Column } from '../types';
import { SEED_BOARD } from '../assets/seed';
import { loadFromStorage, saveToStorage } from '../utils/localStorage';
import toast from 'react-hot-toast';

const BOARD_STORAGE_KEY = 'kanban_board';

export const useBoard = () => {
  const [board, setBoard] = useState<Board>(() => loadFromStorage(BOARD_STORAGE_KEY, SEED_BOARD));

  useEffect(() => {
    saveToStorage(BOARD_STORAGE_KEY, board);
  }, [board]);

  const addTask = (columnId: string, task: Task) => {
    setBoard(prev => {
      const newColumns = prev.columns.map(col => {
        if (col.id === columnId) {
          return { ...col, tasks: [...col.tasks, task] };
        }
        return col;
      });
      return { ...prev, columns: newColumns };
    });
    toast.success('Task created successfully');
  };

  const updateTask = (taskId: string, updatedTask: Task) => {
    setBoard(prev => {
      const newColumns = prev.columns.map(col => {
        // First check if task is in this column, and if we are moving it
        const hasTask = col.tasks.some(t => t.id === taskId);
        
        if (hasTask && col.id !== updatedTask.columnId) {
          // Task is moved to another column
          return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
        } else if (hasTask) {
          // Task stays in this column but updated
          return { ...col, tasks: col.tasks.map(t => (t.id === taskId ? updatedTask : t)) };
        } else if (col.id === updatedTask.columnId) {
          // Task is moved to THIS column
          return { ...col, tasks: [...col.tasks, updatedTask] };
        }
        return col;
      });
      return { ...prev, columns: newColumns };
    });
    toast.success('Task updated');
  };

  const deleteTask = (taskId: string) => {
    setBoard(prev => {
      const newColumns = prev.columns.map(col => ({
        ...col,
        tasks: col.tasks.filter(t => t.id !== taskId)
      }));
      return { ...prev, columns: newColumns };
    });
    toast.error('Task deleted');
  };

  const moveTask = (sourceColId: string, destColId: string, sourceIndex: number, destIndex: number) => {
    setBoard(prev => {
      const newColumns = [...prev.columns];
      const sourceCol = newColumns.find(col => col.id === sourceColId);
      const destCol = newColumns.find(col => col.id === destColId);

      if (!sourceCol || !destCol) return prev;

      if (sourceColId === destColId) {
        // Move within same column
        const newTasks = Array.from(sourceCol.tasks);
        const [removed] = newTasks.splice(sourceIndex, 1);
        newTasks.splice(destIndex, 0, removed);
        
        sourceCol.tasks = newTasks;
      } else {
        // Move across columns
        const sourceTasks = Array.from(sourceCol.tasks);
        const destTasks = Array.from(destCol.tasks);
        
        const [removed] = sourceTasks.splice(sourceIndex, 1);
        removed.columnId = destColId; // update the task's columnId
        
        destTasks.splice(destIndex, 0, removed);
        
        sourceCol.tasks = sourceTasks;
        destCol.tasks = destTasks;
      }

      return { ...prev, columns: newColumns };
    });
  };

  const addColumn = (title: string) => {
    const newCol: Column = {
      id: `col-${Date.now()}`,
      title,
      tasks: []
    };
    setBoard(prev => ({ ...prev, columns: [...prev.columns, newCol] }));
    toast.success('New column added');
  };

  return { board, addTask, updateTask, deleteTask, moveTask, addColumn };
};
