import { createClient } from "redis";
import { env } from "../../../config/env.config";

export const redis = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
});

redis.on("error", (error) => {
  console.error("Redis error:", error);
});

export async function connectRedis(): Promise<void> {
  if (!redis.isOpen) {
    await redis.connect();
  }
}
