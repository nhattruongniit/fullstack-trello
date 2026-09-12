import { client } from "../client";

export async function getWorkspaces() {
  return client.request({
    url: `/api/workspaces`,
    method: 'get',
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching workspaces:', error);
    throw error;
  });
}