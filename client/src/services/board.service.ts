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