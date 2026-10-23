import { PrismaClient } from "@prisma/client";

// En développement, Next.js recharge les fichiers à chaque modification.
// Sans ce garde-fou, chaque rechargement créerait un nouveau client
// (donc de nouvelles connexions) jusqu'à saturer PostgreSQL.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}