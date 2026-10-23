"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";

const idSchema = z.coerce.number().int().positive();
const quantiteSchema = z.coerce.number().int().min(1).max(999);

// Date du jour à Paris : évite le décalage UTC autour de minuit
function dateDuJour(): Date {
  const iso = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Europe/Paris",
  });
  return new Date(iso);
}

export async function ajouterAchat(formData: FormData): Promise<void> {
  const produitId = idSchema.safeParse(formData.get("produitId"));
  const quantite = quantiteSchema.safeParse(formData.get("quantite") ?? "1");
  if (!produitId.success || !quantite.success) {
    throw new Error("Données d'achat invalides.");
  }

  const userId = await getCurrentUserId();
  const produit = await prisma.produit.findFirst({
    where: { id: produitId.data, userId, deletedAt: null },
    select: { id: true, prix: true },
  });
  if (!produit) throw new Error("Produit introuvable.");

  await prisma.achat.create({
    data: {
      userId,
      produitId: produit.id,
      quantite: quantite.data,
      prixUnitaire: produit.prix, // prix du produit à cet instant
      dateAchat: dateDuJour(),
    },
  });

  revalidatePath("/", "layout");
}

export async function retirerAchat(formData: FormData): Promise<void> {
  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) throw new Error("Achat introuvable.");

  const userId = await getCurrentUserId();
  // deleteMany + userId : on ne peut retirer que ses propres achats
  await prisma.achat.deleteMany({ where: { id: id.data, userId } });

  revalidatePath("/", "layout");
}