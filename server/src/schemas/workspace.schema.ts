import { z } from "zod";
import { Visibility } from '../../prisma/generated/prisma/enums.js'

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(1),
  description: z.string().or(z.null()),
  visibility: z.enum(Visibility).default(Visibility.PRIVATE),
})

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>

export const UpdateWorkspaceSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1).optional(),
  description: z.string().or(z.null()).optional(),
  visibility: z.enum(Visibility).optional(),
}).strict();

export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceSchema>
