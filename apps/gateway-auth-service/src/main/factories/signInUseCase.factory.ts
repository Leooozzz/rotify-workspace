import { SignInUseCase } from "../../application/use-cases/signInUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";
import { bcryptHashProvider } from "../../infrastructure/providers/hash/bcrypt";
import { makeTokenProvider } from "./tokenProvider.factory";

export function makeSignInUseCase(): SignInUseCase {
  return new SignInUseCase(
    new UsersRepository(),
    new bcryptHashProvider(),
    makeTokenProvider(),
  );
}
