import { RefreshTokenUseCase } from "../../application/use-cases/RefreshTokenUseCase";
import { UsersRepository } from "../../infrastructure/database/repositories/UsersRepository";
import { CompanyMembersRepository } from "../../infrastructure/database/repositories/CompanyMembersRepository";
import { makeTokenProvider } from "./tokenProvider.factory";
import { makeRefreshTokenProvider } from "./refreshTokenProvider.factory";

export function makeRefreshTokenUseCase(): RefreshTokenUseCase {
  return new RefreshTokenUseCase(
    makeRefreshTokenProvider(),
    new UsersRepository(),
    new CompanyMembersRepository(),
    makeTokenProvider(),
  );
}
