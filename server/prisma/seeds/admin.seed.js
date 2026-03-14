/**
 * 建立 Demo Admin 帳號
 */

import bcrypt from "bcrypt";

import { prisma } from "../../src/lib/prisma.js";

const adminData = {
  email: "admin@test.com",
  password: "admintest",
  role: "admin",
};

export async function seedAdmin() {
  console.log("[Seed] Admin");

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminData.email,
    },
  });

  if (existingAdmin) {
    console.log("[Seed] Admin already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(adminData.password, 10);

  await prisma.user.create({
    data: {
      email: adminData.email,
      passwordHash,
      role: adminData.role,
    },
  });

  console.log("[Seed] Admin created");
}
