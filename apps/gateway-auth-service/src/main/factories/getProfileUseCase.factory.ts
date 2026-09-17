import { GetProfileUseCase } from "../../application/use-cases/GetProfileUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";

export function makeGetProfileUseCase(): GetProfileUseCase {
  return new GetProfileUseCase(new UsersRepository());
}
