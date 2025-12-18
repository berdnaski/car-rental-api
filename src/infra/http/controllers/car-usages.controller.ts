import { Request, Response } from 'express';
import { createCarUsageSchema, finalizeCarUsageSchema, listCarUsagesQuerySchema } from '../../../application/dtos/car-usage.js';
import { CreateCarUsageDTO, FinalizeCarUsageDTO, ListCarUsagesQuery } from '../../../application/dtos/car-usage.js';
import { getErrorMessage } from '../../../shared/utils/http.js';
import { getHttpStatusCode } from '../../../shared/utils/error-handler.js';
import { ListCarUsagesUseCase } from '../../../application/carsUsage/usecases/list-car-usages.usecase.js';
import { CreateCarUsageUseCase } from '../../../application/carsUsage/usecases/create-car-usage.usecase.js';
import { CarUsageRepository } from '../../../domain/repositories/car-usage.repository.js';
import { toCarUsageEntity } from '../../../domain/entities/car-usage.js';
import { FinalizeCarUsageUseCase } from '../../../application/carsUsage/usecases/finalize-car-usage.usecase.js';

export class CarUsagesController {
  constructor(private readonly repo: CarUsageRepository) {}

  create = async (req: Request<{}, {}, CreateCarUsageDTO>, res: Response) => {
    const parsed = createCarUsageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    try {
      const usage = await new CreateCarUsageUseCase(this.repo).execute(parsed.data);
      return res.status(201).json(toCarUsageEntity(usage));
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  finalize = async (req: Request<{ id: string }, {}, FinalizeCarUsageDTO>, res: Response) => {
    const parsed = finalizeCarUsageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    try {
      const usage = await new FinalizeCarUsageUseCase(this.repo).execute(req.params.id, parsed.data);
      return res.json(toCarUsageEntity(usage));
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  list = async (req: Request<{}, {}, {}, ListCarUsagesQuery>, res: Response) => {
    const parsed = listCarUsagesQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const result = await new ListCarUsagesUseCase(this.repo).execute(parsed.data);
    return res.json({
      data: result.data.map(toCarUsageEntity),
      meta: result.meta,
    });
  };
}
