import type { IBoard, IWorkspace } from '../../../models/workspace.type';
import { Link } from 'react-router';

interface WorkspaceSectionProps {
  workspace: IWorkspace;
  onCreateBoard: () => void;
  onEditBoard: (board: IBoard) => void;
  onRemoveBoard: (board: IBoard) => void;
}

function WorkspaceSection({ workspace, onCreateBoard, onEditBoard, onRemoveBoard }: WorkspaceSectionProps) {
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
            to={`/board/${board.id}?workspace_id=${workspace.id}`}
            className="group relative block h-24 overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`h-full w-full ${board.background} p-3`}>
              <span className="text-sm font-semibold text-white drop-shadow-sm">
                {board.title}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            <div>
             <button 
              type="button"
              title="Edit Board"
              className="absolute top-2 right-8 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer mr-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditBoard(board);
              }}
            >
               ✏️
             </button>
             <button 
              type="button"
              title="Remove Board"
              className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveBoard(board);
              }}
            >
               🗑️
             </button>
            </div>
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
export default WorkspaceSection;