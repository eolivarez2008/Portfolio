import { PrismaClient } from "@prisma/client";

const REQUIRED_ENV_VARS = [
  "ADMIN_SECRET",
  "DATABASE_URL",
  "TURNSTILE_SECRET_KEY",
  "DISCORD_CONTACT_WEBHOOK_URL",
];

if (process.env.NODE_ENV === "production") {
  for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key]) {
      throw new Error(
        `[CRITICAL] Variable d'environnement manquante : ${key}. L'application ne peut pas démarrer.`,
      );
    }
  }
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
