import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API_URL
})

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