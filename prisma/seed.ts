import { PrismaClient } from "../node_modules/.prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create a default clinic
  const clinic = await prisma.clinic.upsert({
    where: { id: "default-clinic" },
    update: {},
    create: {
      id: "default-clinic",
      name: "DentaFlow Premium Clinic",
      address: "İstanbul, Türkiye",
      phone: "0212 111 22 33",
    },
  });

  // Create an owner user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@dentaflow.com" },
    update: {},
    create: {
      email: "admin@dentaflow.com",
      name: "Dr. Tansu Kaya",
      password: hashedPassword,
      role: "OWNER",
      clinicId: clinic.id,
    },
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
