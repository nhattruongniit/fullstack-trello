import { useSortable } from '@dnd-kit/react/sortable';
import type { IColumn, ITask } from '../../../models/board.type';
import BoardCard from './board-card';

interface BoardListProps {
  column: IColumn;
  index: number;
  setOpenMenuId: (id: string | null) => void;
  openMenuId: string | null;
  setColumnToDelete: (id: string | null) => void;
  setDeleteConfirmOpen: (isOpen: boolean) => void;
  handleEditTask: (task: ITask) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function BoardColumn({ column, index, openMenuId, setOpenMenuId, setColumnToDelete, setDeleteConfirmOpen, handleEditTask, setIsModalOpen }: BoardListProps) {
  const { ref, handleRef, isDragging } = useSortable({
    id: column.id,
    index,
    type: 'column',
  });

  return (
    <div ref={ref} className={`shrink-0 w-80 ${isDragging ? 'opacity-50' : ''}`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div ref={handleRef} className="flex items-center space-x-2 cursor-grab active:cursor-grabbing">
          <h2 className="text-sm font-semibold text-gray-700 uppercase">
            {column.title}
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {column.tasks.length}
          </span>
        </div>
        
        {/* Three-dot Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenMenuId(openMenuId === column.id ? null : column.id)}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          {openMenuId === column.id && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setOpenMenuId(null)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <button
                  onClick={() => {
                    setColumnToDelete(column.id);
                    setDeleteConfirmOpen(true);
                    setOpenMenuId(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
                >
                  Delete group
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {column.tasks.map((task, taskIndex) => (
          <BoardCard
            key={task.id}
            task={task}
            index={taskIndex}
            columnId={column.id}
            handleEditTask={handleEditTask}
          />
        ))}

        {/* Add New Task Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 border-dashed rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          + Add new task
        </button>
      </div>
    </div>
  )
}
