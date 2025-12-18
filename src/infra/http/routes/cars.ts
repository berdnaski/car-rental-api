import { Router, Request, Response } from "express";
import { CarsController } from "../controllers/cars.controller.js";
import { CarRepositoryPrisma } from "../../database/repositories/car.repository.prisma.js";

const carsRouter = Router();
const repo = new CarRepositoryPrisma();
const controller = new CarsController(repo);

carsRouter.post('/cars', (req: Request, res: Response) => controller.create(req, res));

carsRouter.put('/cars/:id', (req: Request<{ id: string }>, res: Response) => controller.update(req, res));

carsRouter.delete('/cars/:id', (req: Request<{ id: string }>, res: Response) => controller.delete(req, res));

carsRouter.get('/cars/:id', (req: Request<{ id: string }>, res: Response) => controller.getById(req, res));

carsRouter.get('/cars', (req: Request, res: Response) => controller.list(req, res));

export default carsRouter;
