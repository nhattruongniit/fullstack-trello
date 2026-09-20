import React from 'react';

interface AddTaskModalProps {
  toggleOpen: () => void;
  newTask: any;
  setNewTask: React.Dispatch<React.SetStateAction<any | null>>;
  handleAddTask: () => void;
}

function AddTaskModal({ toggleOpen, newTask, setNewTask, handleAddTask }: AddTaskModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-gray-900 opacity-50 transition-opacity"
        onClick={toggleOpen}
      ></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Add new task</h3>
            <button
              onClick={toggleOpen}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="flex flex-col space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Add title here"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                {/* Toolbar */}
                <div className="flex items-center space-x-2 mb-2 px-2 py-1 bg-gray-50 rounded-t-lg border border-gray-300 border-b-0">
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </button>
                  <button className="ml-auto p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
                <textarea
                  placeholder="Write a description here"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="flex-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-b-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Assignee & Communication */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignee & Communication
                </label>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex -space-x-2">
                    <img
                      src="https://flowbite.com/application-ui/demo/images/users/bonnie-green.png"
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://flowbite.com/application-ui/demo/images/users/roberta-casas.png"
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-700">
                      +9
                    </div>
                  </div>
                  <button className="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add member
                  </button>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex flex-wrap gap-3">
                  {['High', 'Medium', 'Low', 'Lowest'].map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newTask.priority === priority.toLowerCase()}
                        onChange={() => setNewTask({ ...newTask, priority: priority.toLowerCase() })}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={newTask.startDate}
                      onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                    <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </label>
                  <select
                    value={newTask.category1}
                    onChange={(e) => setNewTask({ ...newTask, category1: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Design</option>
                    <option>Development</option>
                    <option>Testing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                    <svg className="inline w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </label>
                  <select
                    value={newTask.category2}
                    onChange={(e) => setNewTask({ ...newTask, category2: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Sprint</option>
                    <option>Backlog</option>
                    <option>Epic</option>
                  </select>
                </div>
              </div>

              {/* Deadline notification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline notification
                </label>
                <div className="flex gap-2">
                  <select className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Notification</option>
                    <option>Email</option>
                    <option>SMS</option>
                  </select>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-20 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select className="w-28 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Days</option>
                    <option>Hours</option>
                    <option>Weeks</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-start space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button 
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
              onClick={handleAddTask}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add new task
            </button>
            <button
              onClick={toggleOpen}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;