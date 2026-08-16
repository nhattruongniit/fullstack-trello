import type { WorkspaceUpdateInput } from '../../prisma/generated/prisma/models/Workspace';
import prisma from '../helpers/prisma-client.helper';
import type { CreateWorkspaceInput, UpdateWorkspaceInput } from '../schemas/workspace.schema';
import { Result } from '../utils';

export async function getListWorkspace() {
  try {
    const data = await prisma.workspace.findMany({
      where: {
        visibility: 'PUBLIC'
      }
    });
    return Result.ok(data);
  } catch (error) {
    return Result.error(error);
  }
}

export async function getWorkspaceById(id: number) {
  try {
    const data = await prisma.workspace.findUniqueOrThrow({
      where: { id },
    });
    return Result.ok(data);
  } catch (error) {
    return Result.error(error);
  }
}

export async function createWorkspace(data: CreateWorkspaceInput) {
  try {
    const workspace = await prisma.workspace.create({
      data: {
        name: data.name,
        description: data.description,
        visibility: data.visibility,
      },
    });
    return Result.ok(workspace);
  } catch (error) {
    return Result.error(error);
  }
}

export async function updateWorkspace(data: UpdateWorkspaceInput) {
  try {
    const workspaceUpdateInput: WorkspaceUpdateInput = {};

    if (data.name) {
      workspaceUpdateInput.name = data.name;
    }

    if (data.description) {
      workspaceUpdateInput.description = data.description;
    }

    if (data.visibility) {
      workspaceUpdateInput.visibility = data.visibility;
    }

    const workspace = await prisma.workspace.update({
      where: { id: data.id },
      data: workspaceUpdateInput,
    });
    return Result.ok(workspace);
  } catch (error) {
    return Result.error(error);
  }
}

export async function removeWorkspace(id: number) {
  try {
    const workspace = await prisma.workspace.delete({
      where: { id },
    });
    return Result.ok(workspace);
  } catch (error) {
    return Result.error(error);
  }
}

export async function getWorkspaceByUserId(userId: number) {
  try {
    const workspaces = await prisma.workspace.findMany({
      where: {
        workspaceMembers: {
          some: {
            user: {
              id: userId
            }
          },
        }
      }
    })
    return Result.ok(workspaces);
  } catch (error) {
    return Result.error(error);
  }
}