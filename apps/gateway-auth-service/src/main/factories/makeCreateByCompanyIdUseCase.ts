import { CreateUserByCompanyIdUseCase } from "../../application/use-cases/CreateUserByCompanyIdUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";
import { CompanyMembersRepository } from "../../infrastructure/database/repositories/CompanyMembersRepository";
import { bcryptHashProvider } from "../../infrastructure/providers/hash/bcrypt";

export function makeCreateByCompanyIdUseCase(): CreateUserByCompanyIdUseCase {
  return new CreateUserByCompanyIdUseCase(
    new UsersRepository(),
    new bcryptHashProvider(),
    new CompanyMembersRepository(),
  );
}