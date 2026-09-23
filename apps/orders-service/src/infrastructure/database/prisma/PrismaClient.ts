import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";
import { env } from "../../../config/env.config";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "production" ? ["error"] : ["query", "info", "warn", "error"],
});

export { prisma };
