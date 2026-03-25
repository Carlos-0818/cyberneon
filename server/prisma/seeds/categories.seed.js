/**
 * 建立商品分類初始資料
 */

import { prisma } from "../../src/lib/prisma.js";

const categories = [
  {
    name: "CPU",
    slug: "cpu",
    description: "中央處理器相關商品",
    status: "active",
  },
  {
    name: "GPU",
    slug: "gpu",
    description: "顯示卡相關商品",
    status: "active",
  },
  {
    name: "SSD",
    slug: "ssd",
    description: "固態硬碟相關商品",
    status: "active",
  },
  {
    name: "RAM",
    slug: "ram",
    description: "記憶體相關商品",
    status: "active",
  },
  {
    name: "Motherboard",
    slug: "motherboard",
    description: "主機板相關商品",
    status: "active",
  },
  {
    name: "PSU",
    slug: "psu",
    description: "電源供應器相關商品",
    status: "active",
  },
  {
    name: "CASE",
    slug: "case",
    description: "機殼相關商品",
    status: "active",
  },
];

export async function seedCategories() {
  console.log("[Seed] Categories");

  for (const category of categories) {
    const exists = await prisma.category.findUnique({
      where: {
        slug: category.slug,
      },
    });

    if (exists) {
      console.log(`[Seed] Category exists: ${category.slug}`);
      continue;
    }

    await prisma.category.create({
      data: category,
    });

    console.log(`[Seed] Category created: ${category.slug}`);
  }
}
