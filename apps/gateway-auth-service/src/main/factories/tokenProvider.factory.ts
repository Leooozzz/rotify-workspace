import { ITokenProvider } from "../../application/providers/ITokenProvider";
import { jwtTokenProvider } from "../../infrastructure/providers/token/jwt";

export function makeTokenProvider(): ITokenProvider {
  return new jwtTokenProvider();
}
