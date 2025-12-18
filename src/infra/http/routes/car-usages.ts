import { Router, Request, Response } from 'express';
import { CarUsageRepositoryPrisma } from '../../database/repositories/car-usage.repository.prisma.js';
import { CarUsagesController } from '../controllers/car-usages.controller.js';

const router = Router();
const repo = new CarUsageRepositoryPrisma();
const controller = new CarUsagesController(repo);

router.post('/car-usages', (req: Request, res: Response) => controller.create(req, res));

router.post('/car-usages/:id/finalize', (req: Request<{ id: string }>, res: Response) => controller.finalize(req, res));

router.get('/car-usages', (req: Request, res: Response) => controller.list(req, res));

export default router;
