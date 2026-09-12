import { useState } from 'react';
import { COLORS } from '../../../configs';
import Button from '../../atoms/button';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBoardFormData) => void;
}

export interface CreateBoardFormData {
  title: string;
  background: string;
  description: string;
  visibility: string;
}

function CreateBoardModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateBoardModalProps) {
  const initialFormData: CreateBoardFormData = {
    title: '',
    background: COLORS[0],
    description: '',
    visibility: 'PUBLIC',
  };
  const [formData, setFormData] = useState<CreateBoardFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: CreateBoardFormData = {
      title: formData.title,
      description: formData.description,
      background: formData.background,
      visibility: formData.visibility
    }
    onSubmit(data);
    setFormData(initialFormData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Create New Board</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="boardName" className="block text-sm font-medium text-gray-700">
              Board Name
            </label>
            <input
              id="boardName"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter board name"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Board Description
            </label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter board description"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus={false}
            />
          </div>

          <div>
            <label htmlFor="boardColor" className="block text-sm font-medium text-gray-700">
              Visibility
            </label>
            <select
              id="visibility"
              value={formData.visibility}
              onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          <div>
            <label htmlFor="boardColor" className="block text-sm font-medium text-gray-700">
              Board Color
            </label>
            <div className="mt-2 flex gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, background: color })}
                  className={`h-8 w-8 rounded-full cursor-pointer transition-transform ${color} ${
                    formData.background === color ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              Create Board
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBoardModal;