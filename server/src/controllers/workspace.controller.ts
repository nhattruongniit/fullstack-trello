import type { Request, Response } from 'express';
import { treeifyError } from 'zod'
import * as workspaceService from '../services/workspace.service';
import { UpdateWorkspaceSchema } from '../schemas/workspace.schema';

export async function getListWorkspaces(_: Request, res: Response) {
  const result = await workspaceService.getListWorkspace();
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function getWorkspaceById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await workspaceService.getWorkspaceById(Number(id));
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function removeWorkspace(req: Request, res: Response) {
  const { id } = req.params;
  const result = await workspaceService.removeWorkspace(Number(id));
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function createWorkspace(req: Request, res: Response) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: 'Name and description are required',
      isSuccess: false,
      metadata: {}
    });
  }
  
  const result = await workspaceService.createWorkspace(req.body);
  return res.status(result.isSuccess ? 201 : 500).json(result);
}

export async function updateWorkspace(req: Request, res: Response) {
  const { id } = req.params;

  const validationResult = UpdateWorkspaceSchema.safeParse({
    id: id,
    ...req.body
  });

  if (!validationResult.success) {
    return res.status(400).json({
      error: treeifyError(validationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }
  
  const result = await workspaceService.updateWorkspace(validationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function getWorkspaceByUserId(req: Request, res: Response) {
  const { id } = req.params;
  const result = await workspaceService.getWorkspaceByUserId(Number(id));
  return res.status(result.isSuccess ? 200 : 500).json(result);
}