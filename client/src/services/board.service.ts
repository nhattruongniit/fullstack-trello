import { client } from "../client";

interface CreateBoardProps {
  workspace_id: number;
  data: {
    title: string;
    description: string;
    background: string;
    visibility: string;
  };
}

export async function createBoard({
  workspace_id,
  data
}: CreateBoardProps) {
  return client.request({
    url: `/api/boards`,
    method: 'post',
    params: {
      workspace_id
    },
    data,
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error creating board:', error);
    throw error;
  });
}

interface UpdateBoardProps {
  id: number;
  data: {
    title?: string;
    description?: string;
    background?: string;
    visibility?: string;
  };
}

export async function updateBoard({ id, data }: UpdateBoardProps) {
  return client.request({
    url: `/api/boards/${id}`,
    method: 'patch',
    data,
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error updating board:', error);
    throw error;
  });
}

export async function removeBoard(id: number) {
  return client.request({
    url: `/api/boards/${id}`,
    method: 'delete',
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error removing board:', error);
    throw error;
  });
}

interface GetBoardProps {
  id: number;
  workspace_id: number;
}

export async function getBoard({ id, workspace_id }: GetBoardProps) {
  return client.request({
    url: `/api/boards/${id}`,
    params: {
      workspace_id
    },
    method: 'get',
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching board:', error);
    throw error;
  });
}