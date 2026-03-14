/**
 * Seed 總入口
 * 依序執行各項初始資料建立流程
 */

import { env } from "../../src/config/env.js";
import { prisma } from "../../src/lib/prisma.js";
import { seedAdmin } from "./admin.seed.js";
import { seedCategories } from "./categories.seed.js";
import { seedProducts } from "./products.seed.js";

async function main() {
  if (env.NODE_ENV === "production") {
    throw new Error("[Seed] failed: Seed only allowed in development");
  }

  console.log("[Seed] Start");

  await seedAdmin();
  await seedCategories();
  await seedProducts();

  console.log("[Seed] Done");
}

main()
  .catch((err) => {
    console.error("[Seed] failed: ", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
