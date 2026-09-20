import { client } from "../client";

export interface CreateListProps {
  data: {
    board_id: number;
    title: string;
    position: number;
    background: string;
  };
}

export async function createList({ data }: CreateListProps) {
  return client.request({
    url: `/api/lists`,
    method: 'post',
    data,
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error creating list:', error);
    throw error;
  });
}