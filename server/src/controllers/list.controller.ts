import type { Request, Response } from 'express';
import { treeifyError } from 'zod'
import { CreateListSchema, UpdateListSchema } from '../schemas/list.schema.js';
import { NumberOrStringSchema } from '../schemas/common.schema.js';
import * as listService from '../services/list.service.js';

export async function getLists(req: Request, res: Response) {
  const { board_id: boardId } = req.query;
  const idValidationResult = NumberOrStringSchema.safeParse(boardId);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }
  const result = await listService.getLists(idValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function getListById(req: Request, res: Response) {
  const { board_id: boardId } = req.params;
  const { list_id: listId } = req.query;
  const boardIdValidationResult = NumberOrStringSchema.safeParse(boardId);
  const listIdValidationResult = NumberOrStringSchema.safeParse(listId);

  if (!boardIdValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(boardIdValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  if (!listIdValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(listIdValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }
  const result = await listService.getListById(boardIdValidationResult.data, listIdValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function removeList(req: Request, res: Response) {
  const { board_id: boardId } = req.params;
  const { list_id: listId } = req.query;
  const boardIdValidationResult = NumberOrStringSchema.safeParse(boardId);
  const listIdValidationResult = NumberOrStringSchema.safeParse(listId);

  if (!boardIdValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(boardIdValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  if (!listIdValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(listIdValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await listService.removeList(boardIdValidationResult.data, listIdValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function createList(req: Request, res: Response) {
  const { board_id: boardId } = req.body;
  const bodyValidationResult = CreateListSchema.safeParse(req.body);

  if (!bodyValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(bodyValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await listService.createList(boardId, bodyValidationResult.data);
  return res.status(result.isSuccess ? 201 : 500).json(result);
}

export async function updateList(req: Request, res: Response) {
  const { id } = req.params;

  const idValidationResult = NumberOrStringSchema.safeParse(id);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const bodyValidationResult = UpdateListSchema.safeParse(req.body);

  if (!bodyValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(bodyValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await listService.updateList(idValidationResult.data, bodyValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}
