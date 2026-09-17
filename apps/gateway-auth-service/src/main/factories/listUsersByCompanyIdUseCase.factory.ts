import { ListUsersByCompanyIdUseCase } from "../../application/use-cases/ListUsersByCompanyId";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";

export function makeListUsersByCompanyIdUseCase(): ListUsersByCompanyIdUseCase {
  return new ListUsersByCompanyIdUseCase(new UsersRepository());
}