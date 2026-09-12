import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { createBoard, updateBoard, removeBoard } from '../../services/board.service';
import CreateBoardModal, { type CreateBoardFormData } from '../../components/organisms/modal/create-board-modal';
import EditBoardModal, { type EditBoardFormData } from '../../components/organisms/modal/edit-board-modal';
import ConfirmDeleteModal from '../../components/organisms/modal/confirm-delete-modal';
import Loading from '../../components/atoms/loading';
import type { IBoard, IWorkspace } from '../../models/workspace.type';
import { getWorkspaces } from '../../services/workspace.service';
import WorkspaceSection from './components/workspace';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutateAsync: createBoardMutate } = useMutation({
    mutationFn: (data: CreateBoardFormData) => createBoard({ workspace_id: 7, data }),
  });

  const { isPending: isUpdating, mutateAsync: updateBoardMutate } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EditBoardFormData }) => updateBoard({ id, data }),
  });

  const { isPending: isRemoving, mutateAsync: removeBoardMutate } = useMutation({
    mutationFn: (id: number) => removeBoard(id),
  });

  const { data: workspaces } = useQuery({
    queryKey: ['workspaces'],
    queryFn: getWorkspaces,
  });

  const [search, setSearch] = useState('');
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<IBoard | null>(null);
  const [removingBoard, setRemovingBoard] = useState<IBoard | null>(null);

  const handleCreateBoard = async (data: CreateBoardFormData) => {
    try {
      await createBoardMutate(data);
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });

      toast.success('Created board successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsCreateBoardModalOpen(false);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleEditBoard = async (data: EditBoardFormData) => {
    if (!editingBoard) return;
    try {
      await updateBoardMutate({ id: editingBoard.id, data });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });

      toast.success('Updated board successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEditingBoard(null);
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  const handleConfirmRemove = async () => {
    if (!removingBoard) return;
    try {
      await removeBoardMutate(removingBoard.id);
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });

      toast.success('Removed board successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setRemovingBoard(null);
    } catch (error) {
      console.error('Error removing board:', error);
    }
  };

  const filteredWorkspaces: IWorkspace[] = (workspaces ? workspaces.data : [])
    .map((workspace: IWorkspace) => ({
      ...workspace,
      boards: workspace.boards.filter((board) =>
        board.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((workspace: IWorkspace) => search === '' || workspace.boards.length > 0);

  const isPending = isCreating || isUpdating || isRemoving;

  return (
    <>
      {isPending && <Loading />}
      
      <div className="min-h-screen bg-gray-50">
        <nav className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-3">
            <h1 className="text-xl font-semibold text-gray-900">Trello Clone</h1>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search boards"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img
                src="https://flowbite.com/application-ui/demo/images/users/bonnie-green.png"
                alt="You"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-6 py-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Your Workspaces</h2>
          {filteredWorkspaces.map((workspace) => (
            <WorkspaceSection
              key={workspace.id}
              workspace={workspace}
              onCreateBoard={() => setIsCreateBoardModalOpen(true)}
              onEditBoard={(board) => setEditingBoard(board)}
              onRemoveBoard={(board) => setRemovingBoard(board)}
            />
          ))}
          {filteredWorkspaces.length === 0 && (
            <p className="text-sm text-gray-500">No boards match "{search}".</p>
          )}
        </div>

        <CreateBoardModal
          isOpen={isCreateBoardModalOpen}
          onClose={() => setIsCreateBoardModalOpen(false)}
          onSubmit={handleCreateBoard}
        />

        <EditBoardModal
          isOpen={Boolean(editingBoard)}
          board={editingBoard}
          onClose={() => setEditingBoard(null)}
          onSubmit={handleEditBoard}
        />

        <ConfirmDeleteModal
          isOpen={Boolean(removingBoard)}
          boardTitle={removingBoard?.title}
          onClose={() => setRemovingBoard(null)}
          onConfirm={handleConfirmRemove}
        />
      </div>
    </>
  );
}
