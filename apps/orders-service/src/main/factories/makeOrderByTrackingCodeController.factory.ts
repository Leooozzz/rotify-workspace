import { orderByTrackingCodeUseCase } from "../../application/use-cases/OrderByTrackingCodeUseCase";
import { PrismaOrdersRepository } from "../../infrastructure/database/repositories/PrismaOrdersRepository";
import { OrderByTrackingCodeController } from "../../infrastructure/http/controllers/OrderByTrackingCode";

export function makeOrderByTrackingCodeController(): OrderByTrackingCodeController {
  const repository = new PrismaOrdersRepository();
  const useCase = new orderByTrackingCodeUseCase(repository);
  return new OrderByTrackingCodeController(useCase);
}
