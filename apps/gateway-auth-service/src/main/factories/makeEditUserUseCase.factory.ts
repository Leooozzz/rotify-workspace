import { EditUserUseCase } from "../../application/use-cases/EditUserUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";
import { bcryptHashProvider } from "../../infrastructure/providers/hash/bcrypt";

export function makeEditUserUseCase(): EditUserUseCase {
  return new EditUserUseCase(new UsersRepository(), new bcryptHashProvider());
}
