"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";

const idSchema = z.coerce.number().int().positive();

export async function ajouterEnvie(formData: FormData): Promise<void> {
  const produitId = idSchema.safeParse(formData.get("produitId"));
  if (!produitId.success) throw new Error("Produit invalide.");

  const userId = await getCurrentUserId();
  const produit = await prisma.produit.findFirst({
    where: { id: produitId.data, userId, deletedAt: null },
    select: { id: true },
  });
  if (!produit) throw new Error("Produit introuvable.");

  // Pas de contrainte d'unicité : chaque clic = une tentation de plus
  await prisma.envie.create({ data: { userId, produitId: produit.id } });

  revalidatePath("/", "layout");
}

export async function retirerEnvie(formData: FormData): Promise<void> {
  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) throw new Error("Envie introuvable.");

  const userId = await getCurrentUserId();
  await prisma.envie.deleteMany({ where: { id: id.data, userId } });

  revalidatePath("/", "layout");
}
