import Button from '../../atoms/button';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  boardTitle?: string;
}

function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Remove Board',
  message = 'Are you sure you want to remove this board? This action cannot be undone.',
  boardTitle,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6 space-y-2">
          <p className="text-sm text-gray-600">
            {message}
          </p>
          {boardTitle && (
            <p className="text-sm font-semibold text-gray-800">
              Board: <span className="text-red-600">{boardTitle}</span>
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Remove Board
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;