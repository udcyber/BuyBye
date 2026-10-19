"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function revaliderAchats() {
  revalidatePath("/accueil");
  revalidatePath("/dashboard");
  revalidatePath("/produits");
}

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
  revaliderAchats();
}

export async function retirerAchat(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    return;
  }

  await prisma.achat.delete({
    where: { id: id },
  });
  revaliderAchats();
}
