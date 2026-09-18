export interface ITask {
  id: string;
  title: string;
  description: string;
  assignees: { name: string; avatar: string }[];
  image?: string;
  daysLeft?: number;
  isDone?: boolean;
}

export interface IColumn {
  id: string;
  title: string;
  tasks: ITask[];
}