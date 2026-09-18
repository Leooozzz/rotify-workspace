import { ListUsersUseCase } from "../../application/use-cases/ListUsersUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";

export function makeListUsersUseCase(): ListUsersUseCase {
  return new ListUsersUseCase(new UsersRepository());
}
