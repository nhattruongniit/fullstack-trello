import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

import { createBoard } from '../../services/board.service';
import { CreateBoardModal, type CreateBoardFormData } from '../../components/organisms/modal/create-board-modal';
import Loading from '../../components/atoms/loading';
import type { IWorkspace } from '../../models/workspace.type';
import { getWorkspaces } from '../../services/workspace.service';

function WorkspaceSection({ workspace, onCreateBoard }: { workspace: IWorkspace; onCreateBoard: () => void }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white">
            {workspace.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{workspace.name}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            Boards
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {workspace.boards.map((board) => (
          <Link
            key={board.id}
            to="/board"
            className="group relative block h-24 overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`h-full w-full ${board.background} p-3`}>
              <span className="text-sm font-semibold text-white drop-shadow-sm">
                {board.title}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </Link>
        ))}
        <button
          onClick={onCreateBoard}
          className="flex h-24 w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
        >
          + Create new board
        </button>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: CreateBoardFormData) => createBoard({ workspace_id: 7, data }),
  })
  
  const { data: workspaces } = useQuery({
    queryKey: ['workspaces'],
    queryFn: getWorkspaces,
  });

  const [search, setSearch] = useState('');
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

  const handleCreateBoard = async (data: CreateBoardFormData) => {
    try {
      await mutateAsync(data);
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

  const filteredWorkspaces: IWorkspace[] = (workspaces ? workspaces.data : [])
    .map((workspace: IWorkspace) => ({
      ...workspace,
      boards: workspace.boards.filter((board) =>
        board.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((workspace: IWorkspace) => search === '' || workspace.boards.length > 0);

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
      </div>
    </>
  );
}
