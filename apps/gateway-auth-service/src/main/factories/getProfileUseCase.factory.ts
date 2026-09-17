import { GetProfileUseCase } from "../../application/use-cases/GetProfileUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";
import { CompanyMembersRepository } from "../../infrastructure/database/repositories/CompanyMembersRepository";

export function makeGetProfileUseCase(): GetProfileUseCase {
  return new GetProfileUseCase(new UsersRepository(), new CompanyMembersRepository());
}
