import { ListOrderByCompanyIdUseCase } from "../../application/use-cases/ListOrderByCompanyIdUseCase";
import { PrismaOrdersRepository } from "../../infrastructure/database/repositories/PrismaOrdersRepository";
import { ListOrdersByCompanyController } from "../../infrastructure/http/controllers/ListOrdersByCompanyController";

export function makeListOrdersByCompanyController(): ListOrdersByCompanyController {
  const repository = new PrismaOrdersRepository();
  const useCase = new ListOrderByCompanyIdUseCase(repository);
  return new ListOrdersByCompanyController(useCase);
}
