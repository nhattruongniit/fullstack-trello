import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DragDropProvider, type DragOverEvent } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import HeroIcon from '../../assets/hero.png';
import type { IColumn, ICard } from '../../models/board.type';
import EditTaskModal from '../../components/organisms/modal/edit-task-modal';
import AddTaskModal from '../../components/organisms/modal/add-task-modal';
import ConfirmDeleteGroup from '../../components/organisms/modal/confirm-delete-group';
import AddGroupModal from '../../components/organisms/modal/add-group-modal';
import BoardColumn from './components/board-column';
import { getBoard } from '../../services/board.service';
import { createList, type CreateListProps } from '../../services/list.service';
import { createCard, type CreateCardProps } from '../../services/card.service';

function Board() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id: boardId } = useParams<{ id: string }>();
  const workspaceId = searchParams.get('workspace_id');

  const [columns, setColumns] = React.useState<IColumn[]>([]);
  const { data: dataBoard, isSuccess } = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard({ id: Number(boardId), workspace_id: Number(workspaceId) }),
    enabled: !!boardId && !!workspaceId,
  });

  const { mutateAsync: createListMutate } = useMutation({
    mutationFn: (data: CreateListProps) => createList(data),
  });

  const { mutateAsync: createCardMutate } = useMutation({
    mutationFn: (data: CreateCardProps) => createCard(data),
  });

  const [createNewTaskModalOpen, setCreateNewTaskModalOpen] = React.useState({
    isOpen: false,
    column: null,
  });
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = React.useState(false);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [columnToDelete, setColumnToDelete] = React.useState<string | null>(null);
  const [editingTask, setEditingTask] = React.useState<ICard | null>(null);
  const [newTask, setNewTask] = React.useState({
    title: '',
    description: '',
    priority: 'low',
    startDate: '',
    dueDate: '',
    category1: 'Design',
    category2: 'Sprint'
  });
  const [newGroup, setNewGroup] = React.useState({
    name: '',
  });

  React.useEffect(() => {
    if (isSuccess && dataBoard?.data?.lists) {
      setColumns(dataBoard.data.lists);
    }
  }, [isSuccess, dataBoard?.data?.lists])


  React.useEffect(() => {
    if (!boardId || !workspaceId) {
      navigate('/');
    }
  }, [boardId, workspaceId])

  const handleDeleteGroup = () => {
    if (columnToDelete) {
      setColumns(columns.filter(col => col.id !== columnToDelete));
      setDeleteConfirmOpen(false);
      setColumnToDelete(null);
      setOpenMenuId(null);
    }
  };

  const handleEditTask = (task: ICard) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };


  const handleDragOver = (event: DragOverEvent) => {
    const { source } = event.operation;

    console.log('handleDragOver event: ', source);
    if (!source) return;

    if (source.type === 'column') {
      setColumns((columns) => move(columns, event));
      return;
    }

    if (source.type === 'card') {
      setColumns((columns) => {
        const cardsByColumn = Object.fromEntries(columns.map((col) => [col.id, col.cards]));
        const updatedCardsByColumn = move(cardsByColumn, event);
        return columns.map((col) => ({ ...col, cards: updatedCardsByColumn[col.id] ?? [] }));
      });
    }
  };

  const handleAddGroup = async () => {
    try {
      const bodyData = {
        board_id: Number(boardId),
        title: newGroup.name,
        position: columns.length,
        background: '#ffffff'
      }
      const { data: newList } = await createListMutate({ data: bodyData });

      // hide the group modal
      setIsGroupModalOpen(false);
      setNewGroup({
        name: '',
      });

      // push new list into the columns state
      setColumns((prevColumns) => [
        ...prevColumns,
        {
          id: newList.id,
          title: newList.title,
          position: newList.length,
          background: '#ffffff',
          cards: []
        }
      ]);

      toast.success('Created list successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error('Failed to create list', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleAddTask = async() => {
    if (!createNewTaskModalOpen.column) return;
    try {
      const bodyData = {
        list_id: createNewTaskModalOpen.column.id,
        title: newTask.title,
        position: createNewTaskModalOpen.column.cards.length,
        description: newTask.description,
        background: '#ffffff',
        start_time: newTask.startDate || Date.now(),
        due_time: newTask.dueDate || Date.now(),
      }
      await createCardMutate({ data: bodyData });
      queryClient.invalidateQueries({ queryKey: ['board', boardId] });
    } catch (error) {
      toast.error('Failed to create task', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setCreateNewTaskModalOpen({ isOpen: false, column: null });
      setNewTask({
        title: '',
        description: '',
        priority: 'low',
        startDate: '',
        dueDate: '',
        category1: 'Design',
        category2: 'Sprint'
      })
    }
  };

  if (!boardId || !workspaceId) return null;

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
      <div className="p-4 pb-0 h-[calc(100vh-60px)]">
        <DragDropProvider onDragOver={handleDragOver}>
          <div className="flex gap-4 overflow-x-auto pb-4 h-full">
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
                setCreateNewTaskModalOpen={setCreateNewTaskModalOpen}
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
      {createNewTaskModalOpen.isOpen && (
        <AddTaskModal
          toggleOpen={() => setCreateNewTaskModalOpen(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))}
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
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
          handleAddGroup={handleAddGroup}
        />
      )}
    </div>
  );
}

export default Board;