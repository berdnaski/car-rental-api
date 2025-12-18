import { z } from 'zod';

export const createCarUsageSchema = z.object({
  carId: z.string().uuid('carId inválido'),
  driverId: z.string().uuid('driverId inválido'),
  startDate: z.coerce.date(),
  reason: z.string().min(1, 'reason é obrigatório'),
});

export type CreateCarUsageDTO = z.infer<typeof createCarUsageSchema>;

export const finalizeCarUsageSchema = z.object({
  endDate: z.coerce.date().optional(),
});

export type FinalizeCarUsageDTO = z.infer<typeof finalizeCarUsageSchema>;

export const listCarUsagesQuerySchema = z.object({
  driverName: z.string().optional(),
  carBrand: z.string().optional(),
  carColor: z.string().optional(),
  activeOnly: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListCarUsagesQuery = z.infer<typeof listCarUsagesQuerySchema>;

