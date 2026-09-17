import { sign, verify } from "jsonwebtoken";
import { ITokenProvider } from "../../../application/providers/ITokenProvider";
import { env } from "../../../config/env.config";

interface IPayload {
  sub: string;
}

export class jwtTokenProvider implements ITokenProvider {
  async generateToken(userId: string): Promise<string> {
    return sign({ sub: userId }, env.JWT_SECRET, { expiresIn: "7d" });
  }

  async validateToken(token: string): Promise<string | null> {
    try {
      const { sub } = verify(token, env.JWT_SECRET) as IPayload;
      return sub;
    } catch {
      return null;
    }
  }
}
