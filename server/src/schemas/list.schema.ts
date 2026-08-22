import { z } from "zod";

export const CreateListSchema = z.object({
  title: z.string().min(1),
  position: z.number(),
  board_id: z.number(),
  background: z.string().or(z.null()).default("#fff"),
})

export type CreateListInput = z.infer<typeof CreateListSchema>

export const UpdateListSchema = z.object({
  title: z.string().min(1),
  position: z.number(),
  background: z.string().or(z.null()).default("#fff"),
})

export type UpdateListInput = z.infer<typeof UpdateListSchema>