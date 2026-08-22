import { z } from "zod";

export const CreateCardSchema = z.object({
  title: z.string().min(1),
  description: z.string().or(z.null()).optional(),
  position: z.number(),
  background: z.string().or(z.null()).default("#fff"),
  list_id: z.number(),
  start_time: z.coerce.date().or(z.null()).optional(),
  due_time: z.coerce.date().or(z.null()).optional(),
})

export type CreateCardInput = z.infer<typeof CreateCardSchema>

export const UpdateCardSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().or(z.null()).optional(),
  position: z.number().optional(),
  background: z.string().or(z.null()).optional(),
  start_time: z.coerce.date().or(z.null()).optional(),
  due_time: z.coerce.date().or(z.null()).optional(),
  list_id: z.number().optional(),
}).strict();

export type UpdateCardInput = z.infer<typeof UpdateCardSchema>