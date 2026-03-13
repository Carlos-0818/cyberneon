/**
 * Prisma Client 單例
 * 全專案共用同一個 Prisma Client，避免重複建立連線池
 */
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import { env } from "../config/env.js";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });
