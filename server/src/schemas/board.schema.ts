import { z } from "zod";
import { Visibility } from '../../prisma/generated/prisma/enums.js'

export const CreateBoardSchema = z.object({
  title: z.string().min(1),
  description: z.string().or(z.null()),
  background: z.string().or(z.null()).default("#fff"),
  visibility: z.enum(Visibility).default(Visibility.PRIVATE),
})

export type CreateBoardInput = z.infer<typeof CreateBoardSchema>

export const UpdateBoardSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().or(z.null()).optional(),
  background: z.string().or(z.null()).optional(),
  visibility: z.enum(Visibility).optional(),
}).strict();

export type UpdateBoardInput = z.infer<typeof UpdateBoardSchema>
