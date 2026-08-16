import { z } from 'zod';

export const NumberOrStringSchema = z.number().or(
  z
    .string()
    .refine((value) => !Number.isNaN(Number(value)), {
      message: 'Value must be a number',
    })
    .transform((value) => Number(value))
);