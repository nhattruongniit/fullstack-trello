// mock data

import { COLORS } from "./configs";
import type { IWorkspace } from "./models/workspace.type";

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
