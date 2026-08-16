import prisma from '../helpers/prisma-client.helper';
import type { CreateBoardInput, UpdateBoardInput } from '../schemas/board.schema';
import { Result } from '../utils';
import { getWorkspaceById } from './workspace.service';

export async function getBoards(workspaceId: number) {
  try {
    const data = await prisma.board.findMany({
      where: {
        visibility: 'PUBLIC',
        workspaceId
      }
    });
    return Result.ok(data);
  } catch (error) {
    return Result.error(error);
  }
}

export async function getBoardById(workspaceId: number, id: number) {
  try {
    const data = await prisma.board.findUnique({
      where: { 
        id,
        workspaceId 
      },
    });
    return Result.ok(data);
  } catch (error) {
    return Result.error(error);
  }
}

export async function createBoard(workspaceId: number, data: CreateBoardInput) {

  try {
    // check existed workspace
    const workspace = await getWorkspaceById(workspaceId);
    console.log('workspace', workspace);
    if (!workspace.isSuccess || !workspace.data) {
      console.log('workspace not found', workspace);
      return Result.error(new Error('Workspace not found'));
    }

    const board = await prisma.board.create({
      data: {
        title: data.title,
        description: data.description,
        background: data.background,
        visibility: data.visibility,
        workspaceId,
      },
    });
    return Result.ok(board);
  } catch (error) {
    return Result.error(error);
  }
}

export async function updateBoard(boardId: number, data: UpdateBoardInput) {
  try {
    const boardUpdateInput: UpdateBoardInput = {};

    if (data.title) {
      boardUpdateInput.title = data.title;
    }

    if (data.description) {
      boardUpdateInput.description = data.description;
    }

    if (data.background) {
      boardUpdateInput.background = data.background;
    }

    if (data.visibility) {
      boardUpdateInput.visibility = data.visibility;
    }

    const board = await prisma.board.update({
      where: { id: boardId},
      data: boardUpdateInput,
    });
    return Result.ok(board);
  } catch (error) {
    return Result.error(error);
  }
}

export async function removeBoard(id: number) {
  try {
    const board = await prisma.board.findUnique({
      where: { id },
    });

    if (!board) {
      return Result.error(new Error('Board not found'));
    }

    await prisma.board.delete({
      where: { id: board.id },
    });

    return Result.ok(true);
  } catch (error) {
    return Result.ok(false, { message: 'Failed to delete board', error });
  }
}