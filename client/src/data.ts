// mock data

import { COLORS } from "./configs";
import type { IWorkspace } from "./models/workspace.type";
import type { IColumn } from "./models/board.type";

export const workspaces: IWorkspace[] = [
  {
    id: 7,
    name: "tony workspace1",
    description: "tony public workspace1",
    visibility: "PUBLIC",
    created_at: "2026-08-22T02:34:04.285Z",
    updated_at: "2026-08-22T02:34:04.285Z",
    boards: [
      {
        id: 6,
        title: "tony board",
        description: "tony board description",
        background: COLORS[3],
        visibility: "PUBLIC",
        created_at: "2026-08-22T02:35:03.291Z",
        updated_at: "2026-08-22T02:35:03.291Z",
        workspaceId: 7
      },
      {
        id: 7,
        title: "tony board",
        description: "tony board description",
        background: COLORS[2],
        visibility: "PUBLIC",
        created_at: "2026-09-05T02:49:53.913Z",
        updated_at: "2026-09-05T02:49:53.913Z",
        workspaceId: 7
      },
    ]
  },
  {
    id: 7,
    name: "Product Team",
    description: "Product Team",
    visibility: "PUBLIC",
    created_at: "2026-08-22T02:34:04.285Z",
    updated_at: "2026-08-22T02:34:04.285Z",
    boards: [
      {
        id: 6,
        title: "HVAC Editor",
        description: "this is the HVAC Editor board",
        background: COLORS[0],
        visibility: "PUBLIC",
        created_at: "2026-08-22T02:35:03.291Z",
        updated_at: "2026-08-22T02:35:03.291Z",
        workspaceId: 7
      },
      {
        id: 7,
        title: "Sprint Planning",
        description: "this is the Sprint Planning board",
        background: COLORS[1],
        visibility: "PUBLIC",
        created_at: "2026-09-05T02:49:53.913Z",
        updated_at: "2026-09-05T02:49:53.913Z",
        workspaceId: 7
      },
    ]
  },
  {
    id: 8,
    name: "Marketing",
    description: "Marketing Team",
    visibility: "PUBLIC",
    created_at: "2026-08-22T02:34:04.285Z",
    updated_at: "2026-08-22T02:34:04.285Z",
    boards: [
      {
        id: 8,
        title: "Campaign Launch",
        description: "Campaign Launch description",
        background: COLORS[3],
        visibility: "PUBLIC",
        created_at: "2026-08-22T02:34:04.285Z",
        updated_at: "2026-08-22T02:34:04.285Z",
        workspaceId: 8
      },
      {
        id: 9,
        title: "Content Calendar",
        description: "Content Calendar description",
        background: COLORS[4],
        visibility: "PUBLIC",
        created_at: "2026-08-22T02:34:04.285Z",
        updated_at: "2026-08-22T02:34:04.285Z",
        workspaceId: 8
      },
    ],
  },
];

export const board: IColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 'task-1',
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
        id: 'task-2',
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
        id: 'task-3',
        title: 'Update dependencies',
        description: 'Update all npm packages to their latest stable versions.',
        assignees: [
          { name: 'Michael Gough', avatar: 'https://flowbite.com/application-ui/demo/images/users/michael-gough.png' }
        ],
        daysLeft: 7
      },
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: 'task-55',
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
        id: 'task-77',
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
        id: 'task-6',
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
        id: 'task-7',
        title: 'Create Javascript elements',
        description: 'Complete the implementation of dynamic form elements.',
        assignees: [
          { name: 'Bonnie Green', avatar: 'https://flowbite.com/application-ui/demo/images/users/bonnie-green.png' }
        ],
        isDone: true
      }
    ]
  }
]
