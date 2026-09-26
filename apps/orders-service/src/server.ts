import { env } from "./config/env.config";
import { app } from "./infrastructure/http/app";
import { connectRedis } from "./infrastructure/database/redis/RedisClient";

connectRedis()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Orders service running on port ${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to Redis:", error);
    process.exit(1);
  });