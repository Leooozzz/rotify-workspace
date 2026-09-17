import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";
import { CompanyMembersRepository } from "../../infrastructure/database/repositories/CompanyMembersRepository";
import { bcryptHashProvider } from "../../infrastructure/providers/hash/bcrypt";

export function makeCreateUseCase(): CreateUserUseCase {
  return new CreateUserUseCase(
    new UsersRepository(),
    new bcryptHashProvider(),
    new CompanyMembersRepository(),
  );
}
