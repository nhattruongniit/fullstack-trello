import { useState } from 'react';
import HeroIcon from '../../assets/hero.png';
import { useNavigate } from 'react-router';
import type { IColumn, ITask } from '../../models/board.type';
import EditTaskModal from '../../components/organisms/modal/edit-task-modal';
import AddTaskModal from '../../components/organisms/modal/add-task-modal';
import ConfirmDeleteGroup from '../../components/organisms/modal/confirm-delete-group';
import AddGroupModal from '../../components/organisms/modal/add-group-modal';
import { board } from '../../data';
import BoardColumn from './components/board-column';
import { DragDropProvider, type DragOverEvent } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

function Board() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'low',
    startDate: '',
    dueDate: '',
    category1: 'Design',
    category2: 'Sprint'
  });
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: ''
  });

  const handleDeleteGroup = () => {
    if (columnToDelete) {
      setColumns(columns.filter(col => col.id !== columnToDelete));
      setDeleteConfirmOpen(false);
      setColumnToDelete(null);
      setOpenMenuId(null);
    }
  };

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const [columns, setColumns] = useState<IColumn[]>(board);

  const handleDragOver = (event: DragOverEvent) => {
    const { source } = event.operation;
    if (!source) return;

    if (source.type === 'column') {
      setColumns((columns) => move(columns, event));
      return;
    }

    if (source.type === 'task') {
      setColumns((columns) => {
        const tasksByColumn = Object.fromEntries(columns.map((col) => [col.id, col.tasks]));
        const updatedTasksByColumn = move(tasksByColumn, event);
        return columns.map((col) => ({ ...col, tasks: updatedTasksByColumn[col.id] ?? [] }));
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between space-x-4 w-full">
              <h1 className="text-xl font-semibold text-gray-900">HVAC Editor</h1>
              <div className='cursor-pointer' onClick={() => navigate('/')}>
                <img src={HeroIcon} alt="Logo" width={30} />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Kanban Board */}
      <div className="p-4">
        <DragDropProvider onDragOver={handleDragOver}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column, index) => (
              <BoardColumn
                key={column.id}
                column={column}
                index={index}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                setColumnToDelete={setColumnToDelete}
                setDeleteConfirmOpen={setDeleteConfirmOpen}
                handleEditTask={handleEditTask}
                setIsModalOpen={setIsModalOpen}
              />
            ))}

            {/* Add Another Group */}
            <div className="shrink-0 w-80">
              <button 
                onClick={() => setIsGroupModalOpen(true)}
                className="w-full py-8 text-sm font-medium text-gray-500 bg-white border border-gray-200 border-dashed rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer"
              >
                + Add another group
              </button>
            </div>
          </div>
        </DragDropProvider>
      </div>

      {/* Edit Task Modal */}
      {isEditModalOpen && editingTask && (
        <EditTaskModal 
          toggleOpen={() => setIsEditModalOpen(prevState => !prevState)}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />
      )}

      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          toggleOpen={() => setIsModalOpen(prevState => !prevState)}
          newTask={newTask}
          setNewTask={setNewTask}
        />
      )}


      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <ConfirmDeleteGroup
          toggleOpen={() => setDeleteConfirmOpen(prevState => !prevState)}
          handleDeleteGroup={handleDeleteGroup}
        />
      )}

      {/* Add Group Modal */}
      {isGroupModalOpen && (
        <AddGroupModal
          toggleOpen={() => setIsGroupModalOpen(prevState => !prevState)}
          newGroup={newGroup}
          setNewGroup={setNewGroup}
        />
      )}
    </div>
  );
}

export default Board;