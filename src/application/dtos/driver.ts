import { z } from 'zod';

export const createDriverSchema = z.object({
  name: z.string().min(1, 'name é obrigatório'),
});

export type CreateDriverDTO = z.infer<typeof createDriverSchema>;

export const updateDriverSchema = z.object({
  name: z.string().min(1).optional(),
});

export type UpdateDriverDTO = z.infer<typeof updateDriverSchema>;

export const listDriversQuerySchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListDriversQuery = z.infer<typeof listDriversQuerySchema>;

