"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";

export async function enregistrerPlafond(formData: FormData) {
  const categorieId = Number(formData.get("categorieId"));
  const montantTexte = String(formData.get("montantPlafond") ?? "").trim();
  const montant = Number(montantTexte);
  const userId = await getCurrentUserId();

  if (
    !Number.isInteger(categorieId) ||
    categorieId < 1 ||
    montantTexte === "" ||
    Number.isNaN(montant) ||
    montant < 0
  ) {
    return;
  }

  const categorie = await prisma.categorie.findUnique({
    where: { id: categorieId },
  });
  if (!categorie) {
    return;
  }

  await prisma.plafond.upsert({
    where: { userId_categorieId: { userId, categorieId } },
    update: { montant },
    create: { userId, categorieId, montant },
  });

  revalidatePath("/dashboard");
}
