import { CreateOrderUseCase } from "../../application/use-cases/CreateOrderUseCase";
import { PrismaOrdersRepository } from "../../infrastructure/database/repositories/PrismaOrdersRepository";
import { CreateOrdersController } from "../../infrastructure/http/controllers/CreateOrderController";

export function makeCreateOrdersController(): CreateOrdersController {
  const repository = new PrismaOrdersRepository();
  const useCase = new CreateOrderUseCase(repository);
  return new CreateOrdersController(useCase);
}