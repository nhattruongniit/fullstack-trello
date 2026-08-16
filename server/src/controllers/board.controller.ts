import type { Request, Response } from 'express';
import { treeifyError } from 'zod'
import * as boardService from '../services/board.service';
import { CreateBoardSchema, UpdateBoardSchema } from '../schemas/board.schema';
import { NumberOrStringSchema } from '../schemas/common.schema';

export async function getBoards(req: Request, res: Response) {
  const { workspace_id: workspaceId } = req.query;
  const idValidationResult = NumberOrStringSchema.safeParse(workspaceId);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }
  const result = await boardService.getBoards(idValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function getBoardById(req: Request, res: Response) {
  const { id } = req.params;
  const { workspace_id: workspaceId } = req.query;
  const idValidationResult = NumberOrStringSchema.safeParse(id);
  const workspaceIdValidationResult = NumberOrStringSchema.safeParse(workspaceId);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  if (!workspaceIdValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(workspaceIdValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }
  const result = await boardService.getBoardById(workspaceIdValidationResult.data, idValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function removeBoard(req: Request, res: Response) {
  const { id } = req.params;
  const idValidationResult = NumberOrStringSchema.safeParse(id);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await boardService.removeBoard(idValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function createBoard(req: Request, res: Response) {
  const { workspace_id: workspaceId } = req.query;
  const idValidationResult = NumberOrStringSchema.safeParse(workspaceId);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const bodyValidationResult = CreateBoardSchema.safeParse(req.body);

  if (!bodyValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(bodyValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await boardService.createBoard(idValidationResult.data, bodyValidationResult.data);
  console.log('createBoard result', result);
  return res.status(result.isSuccess ? 201 : 500).json(result);
}

export async function updateBoard(req: Request, res: Response) {
  const { id } = req.params;

  const idValidationResult = NumberOrStringSchema.safeParse(id);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const bodyValidationResult = UpdateBoardSchema.safeParse(req.body);

  if (!bodyValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(bodyValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }
  
  const result = await boardService.updateBoard(idValidationResult.data, bodyValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}