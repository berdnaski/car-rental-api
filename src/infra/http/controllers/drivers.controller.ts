import { Request, Response } from 'express';
import { createDriverSchema, updateDriverSchema, listDriversQuerySchema } from '../../../application/dtos/driver.js';
import { CreateDriverDTO, UpdateDriverDTO, ListDriversQuery } from '../../../application/dtos/driver.js';
import { toDriverEntity } from '../../../domain/entities/driver.js';
import { getErrorMessage } from '../../../shared/utils/http.js';
import { getHttpStatusCode } from '../../../shared/utils/error-handler.js';
import { DriverRepository } from '../../../domain/repositories/driver.repository.js';
import { CreateDriverUseCase } from '../../../application/drivers/usecases/create-driver.usecase.js';
import { UpdateDriverUseCase } from '../../../application/drivers/usecases/update-driver.usecase.js';
import { DeleteDriverUseCase } from '../../../application/drivers/usecases/delete-driver.usecase.js';
import { GetDriverByIdUseCase } from '../../../application/drivers/usecases/get-driver-by-id.usecase.js';
import { ListDriversUseCase } from '../../../application/drivers/usecases/list-drivers.usecase.js';

export class DriversController {
  constructor(private readonly repo: DriverRepository) {}

  create = async (req: Request<{}, {}, CreateDriverDTO>, res: Response) => {
    const parsed = createDriverSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    try {
      const driver = await new CreateDriverUseCase(this.repo).execute(parsed.data);
      return res.status(201).json(toDriverEntity(driver));
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  update = async (req: Request<{ id: string }, {}, UpdateDriverDTO>, res: Response) => {
    const parsed = updateDriverSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    try {
      const driver = await new UpdateDriverUseCase(this.repo).execute(req.params.id, parsed.data);
      return res.json(toDriverEntity(driver));
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    try {
      await new DeleteDriverUseCase(this.repo).execute(req.params.id);
      return res.status(204).send();
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const driver = await new GetDriverByIdUseCase(this.repo).execute(req.params.id);
      return res.json(toDriverEntity(driver));
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  list = async (req: Request<{}, {}, {}, ListDriversQuery>, res: Response) => {
    const parsed = listDriversQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const result = await new ListDriversUseCase(this.repo).execute(parsed.data);
    return res.json({
      data: result.data.map(toDriverEntity),
      meta: result.meta,
    });
  };
}
