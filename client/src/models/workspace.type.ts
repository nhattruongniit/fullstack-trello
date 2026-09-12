export interface IWorkspace {
  id: number;
  name: string;
  description: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  boards: IBoard[];
}

export interface IBoard {
  id: number;
  title: string;
  description: string;
  background: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  workspaceId: number;
}