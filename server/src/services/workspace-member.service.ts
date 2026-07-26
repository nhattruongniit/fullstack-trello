import prisma from '../helpers/prisma-client.helper';
import type { AddWorkspaceMemberInput } from '../schemas/workspace-member.schema';
import { Result } from '../utils';

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