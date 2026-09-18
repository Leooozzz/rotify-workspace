import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";

export function makeDeleteUserUseCase(): DeleteUserUseCase {
  return new DeleteUserUseCase(new UsersRepository());
}
