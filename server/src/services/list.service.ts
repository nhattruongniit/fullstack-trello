import prisma from '../helpers/prisma-client.helper.js';
import type { CreateListInput, UpdateListInput } from '../schemas/list.schema.js';
import { Result } from '../utils/index.js';

export async function getLists(boardId: number) {
  try {
    const data = await prisma.list.findMany({
      where: {
        boardId,
        deleted_at: null
      }
    });
    return Result.ok(data);
  } catch (error) {
    return Result.error(error);
  }
}

export async function getListById(boardId: number, listId: number) {
  try {
    const data = await prisma.list.findUnique({
      where: {
        id: listId,
        boardId,
        deleted_at: null
      },
    });
    return Result.ok(data);
  } catch (error) {
    return Result.error(error);
  }
}

export async function createList(boardId: number, data: CreateListInput) {
  try {
    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      return Result.error(new Error('Board not found'));
    }

    const list = await prisma.list.create({
      data: {
        title: data.title,
        position: data.position,
        background: data.background,
        boardId
      },
    });
    return Result.ok(list);
  } catch (error) {
    return Result.error(error);
  }
}

export async function updateList(listId: number, data: UpdateListInput) {
  try {
    const listUpdateInput: Record<string, unknown> = {};

    if (data.title !== undefined) {
      listUpdateInput.title = data.title;
    }

    if (data.position !== undefined) {
      listUpdateInput.position = data.position;
    }

    if (data.background !== undefined) {
      listUpdateInput.background = data.background;
    }

    const list = await prisma.list.update({
      where: { id: listId },
      data: listUpdateInput,
    });
    return Result.ok(list);
  } catch (error) {
    return Result.error(error);
  }
}

export async function removeList(boardId: number, listId: number) {
  try {
    const list = await getListById(boardId, listId);
    if (!list) {
      return Result.error(new Error('List not found'));
    }

    await prisma.list.update({
      where: { id: list.data.id },
      data: { deleted_at: new Date() },
    });

    return Result.ok(true);
  } catch (error) {
    return Result.ok(false, { message: 'Failed to delete list', error });
  }
}
