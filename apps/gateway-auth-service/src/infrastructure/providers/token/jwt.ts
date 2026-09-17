import { sign, verify } from "jsonwebtoken";
import {
  ITokenPayload,
  ITokenProvider,
} from "../../../application/providers/ITokenProvider";
import { env } from "../../../config/env.config";

export class jwtTokenProvider implements ITokenProvider {
  async generateToken(payload: ITokenPayload): Promise<string> {
    return sign(payload, env.JWT_SECRET, { expiresIn: "15m" });
  }

  async validateToken(token: string): Promise<ITokenPayload | null> {
    try {
      const decoded = verify(token, env.JWT_SECRET) as ITokenPayload;

      if (!decoded.sub) {
        return null;
      }

      return {
        sub: decoded.sub,
        role: decoded.role,
        companyId: decoded.companyId ?? null,
        companyRole: decoded.companyRole ?? null,
      };
    } catch {
      return null;
    }
  }
}
