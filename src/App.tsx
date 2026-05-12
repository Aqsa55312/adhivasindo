import { useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { TopBar } from './components/TopBar/TopBar';
import { Board as BoardComponent } from './components/Board/Board';
import { FilterPanel } from './components/FilterPanel/FilterPanel';
import { TaskModal } from './components/TaskModal/TaskModal';
import { useBoard } from './hooks/useBoard';
import { useFilter } from './hooks/useFilter';
import { Task } from './types';

function App() {
  const { board, addTask, updateTask, deleteTask, moveTask, addColumn } = useBoard();
  const { filters, updateFilter, clearFilters, filteredColumns } = useFilter(board);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultColumnId, setDefaultColumnId] = useState<string | undefined>(undefined);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(source.droppableId, destination.droppableId, source.index, destination.index);
  };

  const handleAddTaskClick = (columnId: string) => {
    setDefaultColumnId(columnId);
    setSelectedTask(undefined);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (selectedTask) {
      updateTask(task.id, task);
    } else {
      addTask(task.columnId, task);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <TopBar 
        boardName={board.name}
        onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => updateFilter('searchQuery', query)}
      />
      
      <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden">
        <FilterPanel 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
        />
        
        <BoardComponent 
          columns={filteredColumns} 
          onDragEnd={handleDragEnd}
          onAddTask={handleAddTaskClick}
          onTaskClick={handleTaskClick}
          onAddColumn={addColumn}
        />
      </div>

      <TaskModal 
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        columns={board.columns}
        board={board}
        defaultColumnId={defaultColumnId}
      />
    </div>
  );
}

export default App;
