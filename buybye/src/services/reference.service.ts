import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";
import type { CategorieAvecFamilles, TypeOption } from "@/types";

export async function getCategoriesAvecFamilles(): Promise<CategorieAvecFamilles[]> {
  return prisma.categorie.findMany({
    where: { familles: { some: {} } },
    orderBy: { code: "asc" },
    select: {
      id: true,
      nom: true,
      familles: { orderBy: { nom: "asc" }, select: { id: true, nom: true } },
    },
  });
}

// Les types sont personnels : on ne renvoie que ceux de l'utilisateur
export async function getTypesProduit(): Promise<TypeOption[]> {
  const userId = await getCurrentUserId();
  return prisma.typeProduit.findMany({
    where: { userId },
    orderBy: { nom: "asc" },
    select: { id: true, nom: true },
  });
}