import { client } from "../client";

export interface CreateCardProps {
  data: {
    list_id: number;
    title: string;
    position: number;
    description: string;
    background: string;
    start_time: number;
    due_time: number;
  };
}

export async function createCard({ data }: CreateCardProps) {
  return client.request({
    url: `/api/cards`,
    method: 'post',
    data,
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error creating card:', error);
    throw error;
  });
}