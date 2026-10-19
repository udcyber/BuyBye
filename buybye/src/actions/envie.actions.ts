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

export async function retirerEnvie(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    return;
  }

  await prisma.envie.delete({
    where: { id: id },
  });
  revalidatePath("/envie");
}
