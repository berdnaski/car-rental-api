import { Router, Request, Response } from 'express';
import { DriversController } from '../controllers/drivers.controller.js';
import { DriverRepositoryPrisma } from '../../database/repositories/driver.repository.prisma.js';

const router = Router();
const repo = new DriverRepositoryPrisma();
const controller = new DriversController(repo);

router.post('/drivers', (req: Request, res: Response) => controller.create(req, res));

router.put('/drivers/:id', (req: Request<{ id: string }>, res: Response) => controller.update(req, res));

router.delete('/drivers/:id', (req: Request<{ id: string }>, res: Response) => controller.delete(req, res));

router.get('/drivers/:id', (req: Request<{ id: string }>, res: Response) => controller.getById(req, res));

router.get('/drivers', (req: Request, res: Response) => controller.list(req, res));

export default router;
