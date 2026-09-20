import type { Request, Response } from 'express';
import { treeifyError } from 'zod'
import * as cardService from '../services/card.service.js';
import { CreateCardSchema, UpdateCardSchema } from '../schemas/card.schema.js';
import { NumberOrStringSchema } from '../schemas/common.schema.js';

export async function getCards(req: Request, res: Response) {
  const { list_id: listId } = req.query;
  const idValidationResult = NumberOrStringSchema.safeParse(listId);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }
  const result = await cardService.getCards(idValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function getCardById(req: Request, res: Response) {
  const { id } = req.params;
  const { list_id: listId } = req.query;
  const idValidationResult = NumberOrStringSchema.safeParse(id);
  const listIdValidationResult = NumberOrStringSchema.safeParse(listId);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
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
  const result = await cardService.getCardById(listIdValidationResult.data, idValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function removeCard(req: Request, res: Response) {
  const { id } = req.params;
  const idValidationResult = NumberOrStringSchema.safeParse(id);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await cardService.removeCard(idValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}

export async function createCard(req: Request, res: Response) {
  const { list_id: listId } = req.body;
  const bodyValidationResult = CreateCardSchema.safeParse(req.body);

  if (!bodyValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(bodyValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await cardService.createCard(listId, bodyValidationResult.data);
  return res.status(result.isSuccess ? 201 : 500).json(result);
}

export async function updateCard(req: Request, res: Response) {
  const { id } = req.params;

  const idValidationResult = NumberOrStringSchema.safeParse(id);

  if (!idValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(idValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const bodyValidationResult = UpdateCardSchema.safeParse(req.body);

  if (!bodyValidationResult.success) {
    return res.status(400).json({
      error: treeifyError(bodyValidationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await cardService.updateCard(idValidationResult.data, bodyValidationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}
