import type { Request, Response } from 'express';
import { treeifyError } from 'zod'

import { AddWorkspaceMemberSchema } from '../schemas/workspace-member.schema.js';

import * as workspaceMemberService from '../services/workspace-member.service.js';

export async function addMember(req: Request, res: Response) {
  const validationResult = AddWorkspaceMemberSchema.safeParse({ ...req.body });
  if (!validationResult.success) {
    return res.status(400).json({
      error: treeifyError(validationResult.error),
      isSuccess: false,
      metadata: {}
    });
  }

  const result = await workspaceMemberService.addMember(validationResult.data);
  return res.status(result.isSuccess ? 200 : 500).json(result);
}