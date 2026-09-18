import { randomBytes } from "node:crypto";
import { IRefreshTokenProvider } from "../../../application/providers/IRefreshTokenProvider";
import { redis } from "../../database/redis/RedisClient";

const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
const KEY_PREFIX = "refresh:";

export class RedisRefreshTokenProvider implements IRefreshTokenProvider {
  async generate(userId: string): Promise<string> {
    const token = randomBytes(32).toString("hex");
    await redis.setEx(`${KEY_PREFIX}${token}`, REFRESH_TOKEN_TTL_SECONDS, userId);
    return token;
  }

  async verify(token: string): Promise<string | null> {
    return redis.get(`${KEY_PREFIX}${token}`);
  }

  async revoke(token: string): Promise<void> {
    await redis.del(`${KEY_PREFIX}${token}`);
  }
}
