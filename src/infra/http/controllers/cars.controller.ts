import { Request, Response } from 'express';
import { createCarSchema, updateCarSchema, listCarsQuerySchema } from '../../../application/dtos/car.js';
import { CreateCarDTO, UpdateCarDTO, ListCarsQuery } from '../../../application/dtos/car.js';
import { getErrorMessage } from '../../../shared/utils/http.js';
import { getHttpStatusCode } from '../../../shared/utils/error-handler.js';
import { CreateCarUseCase } from '../../../application/cars/usecases/create-car.usecase.js';
import { UpdateCarUseCase } from '../../../application/cars/usecases/update-car.usecase.js';
import { DeleteCarUseCase } from '../../../application/cars/usecases/delete-car.usecase.js';
import { GetCarByIdUseCase } from '../../../application/cars/usecases/get-car-by-id.usecase.js';
import { ListCarsUseCase } from '../../../application/cars/usecases/list-cars.usecase.js';
import { toCarEntity } from '../../../domain/entities/car.js';
import { CarRepository } from '../../../domain/repositories/car.repository.js';

export class CarsController {
  constructor(private readonly repo: CarRepository) {}

  create = async (req: Request<{}, {}, CreateCarDTO>, res: Response) => {
    const parsed = createCarSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    try {
      const car = await new CreateCarUseCase(this.repo).execute(parsed.data);
      return res.status(201).json(toCarEntity(car));
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  update = async (req: Request<{ id: string }, {}, UpdateCarDTO>, res: Response) => {
    const parsed = updateCarSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    try {
      const car = await new UpdateCarUseCase(this.repo).execute(req.params.id, parsed.data);
      return res.json(toCarEntity(car));
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    try {
      await new DeleteCarUseCase(this.repo).execute(req.params.id);
      return res.status(204).send();
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const car = await new GetCarByIdUseCase(this.repo).execute(req.params.id);
      return res.json(toCarEntity(car));
    } catch (error: unknown) {
      const statusCode = getHttpStatusCode(error);
      return res.status(statusCode).json({ message: getErrorMessage(error) });
    }
  };

  list = async (req: Request<{}, {}, {}, ListCarsQuery>, res: Response) => {
    const parsed = listCarsQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const result = await new ListCarsUseCase(this.repo).execute(parsed.data);
    return res.json({
      data: result.data.map(toCarEntity),
      meta: result.meta,
    });
  };
}
