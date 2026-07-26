import { z } from "zod";

export const AddWorkspaceMemberSchema = z.object({
  userId: z.coerce.number(),
  workspaceId: z.coerce.number(),
})

export type AddWorkspaceMemberInput = z.infer<typeof AddWorkspaceMemberSchema>
