import { IRefreshTokenProvider } from "../../application/providers/IRefreshTokenProvider";
import { RedisRefreshTokenProvider } from "../../infrastructure/providers/token/RedisRefreshTokenProvider";

export function makeRefreshTokenProvider(): IRefreshTokenProvider {
  return new RedisRefreshTokenProvider();
}
