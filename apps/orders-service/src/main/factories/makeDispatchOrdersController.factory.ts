import { DispatchOrderUseCase } from "../../application/use-cases/DispatchOrderUseCase";
import { RabbitMQProvider } from "../../application/providers/RabbitMqProviders";
import { PrismaOrdersRepository } from "../../infrastructure/database/repositories/PrismaOrdersRepository";
import { DispatchOrderController } from "../../infrastructure/http/controllers/DispatchOrderController";

export function makeDispatchOrdersController(): DispatchOrderController {
  const repository = new PrismaOrdersRepository();
  const messageQueue = new RabbitMQProvider();
  const useCase = new DispatchOrderUseCase(repository, messageQueue);
  return new DispatchOrderController(useCase);
}