import prisma from '../helpers/prisma-client.helper.js';
import type { CreateCardInput, UpdateCardInput } from '../schemas/card.schema.js';
import { Result } from '../utils/index.js';

export async function getCards(listId: number) {
  try {
    const data = await prisma.card.findMany({
      where: {
        listId,
        deleted_at: null,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return Result.ok(data);
  } catch (error) {
    return Result.error(error);
  }
}

export async function getCardById(listId: number, id: number) {
  try {
    const data = await prisma.card.findUnique({
      where: {
        id,
        listId,
        deleted_at: null,
      },
    });
    return Result.ok(data);
  } catch (error) {
    return Result.error(error);
  }
}

export async function createCard(listId: number, data: CreateCardInput) {
  try {
    const list = await prisma.list.findUnique({
      where: { id: listId, deleted_at: null },
    });

    if (!list) {
      return Result.error(new Error('List not found'));
    }

    const card = await prisma.card.create({
      data: {
        title: data.title,
        description: data.description,
        position: data.position,
        background: data.background,
        start_time: data.start_time,
        due_time: data.due_time,
        listId,
      },
    });
    return Result.ok(card);
  } catch (error) {
    return Result.error(error);
  }
}

export async function updateCard(cardId: number, data: UpdateCardInput) {
  try {
    const cardUpdateInput: Record<string, unknown> = {};

    if (data.title !== undefined) {
      cardUpdateInput.title = data.title;
    }

    if (data.description !== undefined) {
      cardUpdateInput.description = data.description;
    }

    if (data.position !== undefined) {
      cardUpdateInput.position = data.position;
    }

    if (data.background !== undefined) {
      cardUpdateInput.background = data.background;
    }

    if (data.start_time !== undefined) {
      cardUpdateInput.start_time = data.start_time;
    }

    if (data.due_time !== undefined) {
      cardUpdateInput.due_time = data.due_time;
    }

    if (data.list_id !== undefined) {
      cardUpdateInput.listId = data.list_id;
    }

    const card = await prisma.card.update({
      where: { id: cardId },
      data: cardUpdateInput,
    });
    return Result.ok(card);
  } catch (error) {
    return Result.error(error);
  }
}

export async function removeCard(id: number) {
  try {
    const card = await prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      return Result.error(new Error('Card not found'));
    }

    await prisma.card.update({
      where: { id: card.id },
      data: { deleted_at: new Date() },
    });

    return Result.ok(true);
  } catch (error) {
    return Result.ok(false, { message: 'Failed to delete card', error });
  }
}
