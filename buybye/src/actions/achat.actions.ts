"use server";

import { revalidatePath } from "next/cache";
import { achats } from "@/lib/mocks";
import { prisma } from "@/lib/prisma";

export async function ajouterAchat(formData: FormData) {
  const produitId = Number(formData.get("produitId"));
  const quantite = Number(formData.get("quantite") ?? 1);

  if (!produitId || quantite <= 0) {
    return;
  }

  await prisma.achat.create({
    data: {
      produitId: produitId,
      quantite: quantite,
      date: new Date(),
    },
  });
  revalidatePath("/accueil");
  revalidatePath("/dashboard");
  revalidatePath("/produits");
}

export async function retirerAchat(id: number) {
  const index = achats.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  achats.splice(index, 1);
  revalidatePath("/accueil");
  revalidatePath("/dashboard");
}
