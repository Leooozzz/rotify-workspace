import { RabbitMQProvider } from "../../application/providers/RabbitMqProviders";
import { CancelOrderUseCase } from "../../application/use-cases/CancelOrderUseCase";
import { PrismaOrdersRepository } from "../../infrastructure/database/repositories/PrismaOrdersRepository";
import { CancelOrderController } from "../../infrastructure/http/controllers/CancelOrderController";

export function makeCancelOrderController(): CancelOrderController {
  const repository = new PrismaOrdersRepository();
  const messageQueue = new RabbitMQProvider();
  const useCase = new CancelOrderUseCase(repository, messageQueue);
  return new CancelOrderController(useCase);
}
