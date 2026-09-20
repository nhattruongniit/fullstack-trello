import prisma from '../helpers/prisma-client.helper.js';
import type { AddWorkspaceMemberInput } from '../schemas/workspace-member.schema.js';
import { Result } from '../utils/index.js';

export async function addMember(data: AddWorkspaceMemberInput) {
  try {
    const result = await prisma.workspaceMember.create({
      data: {
        userId: data.userId,
        workspaceId: data.workspaceId
      }
    })
    return Result.ok(result);
  } catch (error) {
    return Result.error(error);
  }
}