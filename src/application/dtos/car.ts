import { z } from 'zod';

export const createCarSchema = z.object({
  licensePlate: z.string().min(1, 'licensePlate é obrigatório'),
  color: z.string().min(1, 'color é obrigatório'),
  brand: z.string().min(1, 'brand é obrigatório'),
});

export type CreateCarDTO = z.infer<typeof createCarSchema>;

export const updateCarSchema = z
  .object({
    licensePlate: z.string().min(1).optional(),
    color: z.string().min(1).optional(),
    brand: z.string().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo para atualizar',
  });

export type UpdateCarDTO = z.infer<typeof updateCarSchema>;

export const listCarsQuerySchema = z.object({
  color: z.string().optional(),
  brand: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListCarsQuery = z.infer<typeof listCarsQuerySchema>;

