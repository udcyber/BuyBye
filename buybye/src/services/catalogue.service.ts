import type { Produit } from "@/types";
import { prisma } from "@/lib/prisma";

export async function lireCatalogue(): Promise<Produit[]> {
  return prisma.produit.findMany({ orderBy: { id: "asc" } });
}
