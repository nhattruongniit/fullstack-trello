import { useState } from 'react';
import HeroIcon from '../../assets/hero.png';
import { useNavigate } from 'react-router';
import EditTaskModal from '../../components/organisms/modal/edit-task-modal';
import AddTaskModal from '../../components/organisms/modal/add-task-modal';
import ConfirmDeleteGroup from '../../components/organisms/modal/confirm-delete-group';
import AddGroupModal from '../../components/organisms/modal/add-group-modal';

interface Task {
  id: number;
  title: string;
  description: string;
  assignees: { name: string; avatar: string }[];
  daysLeft?: number;
  image?: string;
  isDone?: boolean;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

function Board() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 1,
          title: 'Change charts javascript',
          description: 'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
            { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' },
            { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
          ],
          daysLeft: 5
        },
        {
          id: 2,
          title: 'Change homepage',
          description: 'Change homepage for Volt Dashboard.',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
            { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' }
          ],
          image: 'https://flowbite.com/application-ui/demo/images/kanban/task-4-dark.png',
          daysLeft: 22
        },
        {
          id: 3,
          title: 'Update dependencies',
          description: 'Update all npm packages to their latest stable versions.',
          assignees: [
            { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
          ],
          daysLeft: 7
        },
        {
          id: 4,
          title: 'Update dependencies',
          description: 'Update all npm packages to their latest stable versions.',
          assignees: [
            { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
          ],
          daysLeft: 7
        },
        {
          id: 5,
          title: 'Update dependencies',
          description: 'Update all npm packages to their latest stable versions.',
          assignees: [
            { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
          ],
          daysLeft: 7
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        {
          id: 4,
          title: 'Redesign tables card',
          description: 'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
            { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' }
          ],
          image: 'https://flowbite.com/application-ui/demo/images/kanban/task-1-dark.jpg',
          daysLeft: 9
        },
        {
          id: 5,
          title: 'Fix responsive issues',
          description: 'Resolve mobile view problems on the dashboard page.',
          assignees: [
            { name: 'Roberta Casas', avatar: 'https://flowbite.com/application-ui/demo/images/users/roberta-casas.png' }
          ],
          daysLeft: 3
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 6,
          title: 'Redesign tables card',
          description: 'In _variables.scss on line 672 you define $table_variants. Each instance of "color-level" needs to be changed to "shift-color".',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' },
            { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
          ],
          image: 'https://flowbite.com/application-ui/demo/images/kanban/task-2-dark.jpg',
          isDone: true
        },
        {
          id: 7,
          title: 'Create Javascript elements',
          description: 'Complete the implementation of dynamic form elements.',
          assignees: [
            { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' }
          ],
          isDone: true
        }
      ]
    }
  ]);

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
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="shrink-0 w-80">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
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
                {column.tasks.map((task) => (
                  <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    
                    {/* Task Title */}
                    <div className="flex items-start justify-between mb-2 group">
                      <h3 className="text-base font-semibold text-gray-900 flex-1">
                        {task.title}
                      </h3>
                      <button
                        onClick={() => handleEditTask(task)}
                        className="ml-2 text-gray-400 transition-opacity cursor-pointer"
                        title="Edit task"
                      >
                        <svg className="w-[1.25rem] h-[1.25rem]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z" clip-rule="evenodd"></path>
                          <path fill-rule="evenodd" d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z" clip-rule="evenodd"></path>
                        </svg>
                      </button>
                    </div>

                    {/* Task Image */}
                    {task.image && (
                      <img
                        src={task.image}
                        alt={task.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}

                    {/* Task Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Task Footer */}
                    <div className="flex items-center justify-between">
                      {/* Assignees */}
                      <div className="flex -space-x-2">
                        {task.assignees.map((assignee, index) => (
                          <img
                            key={index}
                            src={assignee.avatar}
                            alt={assignee.name}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            title={assignee.name}
                          />
                        ))}
                      </div>

                      {/* Days Left / Status */}
                      {task.isDone ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Done
                        </span>
                      ) : task.daysLeft !== undefined && (
                        <span className="text-xs text-gray-500">
                          {task.daysLeft} day{task.daysLeft !== 1 ? 's' : ''} left
                        </span>
                      )}
                    </div>
                  </div>
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