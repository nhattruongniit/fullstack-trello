import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export const RegisterSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  age: z.number().int().positive().optional(),
  phone: z.string().optional(),
})