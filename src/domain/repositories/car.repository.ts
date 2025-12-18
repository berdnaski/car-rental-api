import { Car } from "@prisma/client";
import { CreateCarDTO, ListCarsQuery, UpdateCarDTO } from "../../application/dtos/car.js";
import { PaginatedResponse } from "../../shared/types/pagination.js";

export interface CarRepository {
  create(data: CreateCarDTO): Promise<Car>;
  update(id: string, data: UpdateCarDTO): Promise<Car>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Car | null>;
  findByLicensePlate(licensePlate: string): Promise<Car | null>;
  list(filters: ListCarsQuery): Promise<PaginatedResponse<Car>>;
}

