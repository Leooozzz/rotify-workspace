import { SignUpUseCase } from "../../application/use-cases/SignUpUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";
import { bcryptHashProvider } from "../../infrastructure/providers/hash/bcrypt";

export function makeSignUpUseCase(): SignUpUseCase {
  return new SignUpUseCase(new UsersRepository(), new bcryptHashProvider());
}
