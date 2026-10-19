"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function ajouterEnvie(formData: FormData) {
  const produitId = Number(formData.get("produitId"));

  if (!produitId) {
    return;
  }

  await prisma.envie.create({
    data: {
      produitId: produitId,
      dateAjout: new Date(),
    },
  });
  revalidatePath("/envie");
}

export async function retirerEnvie(id: number) {
  const index = envies.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  envies.splice(index, 1);
  revalidatePath("/envie");
}
