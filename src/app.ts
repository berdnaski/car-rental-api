import express from 'express';
import carsRouter from './infra/http/routes/cars.js';
import driversRouter from './infra/http/routes/drivers.js';
import carUsagesRouter from './infra/http/routes/car-usages.js';
import swaggerUi from 'swagger-ui-express';
import { openapi } from './infra/http/swagger/index.js';

const app = express();

app.use(express.json());
app.use(carsRouter);
app.use(driversRouter);
app.use(carUsagesRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi, { customSiteTitle: 'Car Rental API Docs' }));

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});

export default app;
