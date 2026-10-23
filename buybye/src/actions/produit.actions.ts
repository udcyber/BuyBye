"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";
import type { EtatFormulaire } from "@/types";

const produitSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(1, "Le nom est obligatoire.")
    .max(100, "100 caractères maximum."),
  prix: z.coerce
    .number()
    .positive("Le prix doit être supérieur à 0.")
    .max(100000, "Prix trop élevé."),
  familleId: z.coerce.number().int().positive("Choisissez une famille."),
  typeProduitId: z.string().optional(),
  nouveauType: z.string().trim().max(50, "50 caractères maximum.").optional(),
});

type DonneesProduit = z.infer<typeof produitSchema>;

function erreursParChamp(error: z.ZodError): Record<string, string> {
  const erreurs: Record<string, string> = {};
  for (const issue of error.issues) {
    const champ = String(issue.path[0] ?? "formulaire");
    if (!erreurs[champ]) erreurs[champ] = issue.message;
  }
  return erreurs;
}

function lireFormulaire(formData: FormData) {
  const brut = Object.fromEntries(formData) as Record<string, string>;
  const valeurs = {
    nom: brut.nom ?? "",
    prix: brut.prix ?? "",
    familleId: brut.familleId ?? "",
    typeProduitId: brut.typeProduitId ?? "",
    nouveauType: brut.nouveauType ?? "",
  };

  const resultat = produitSchema.safeParse(valeurs);
  if (!resultat.success) {
    return {
      ok: false as const,
      etat: { erreurs: erreursParChamp(resultat.error), valeurs } satisfies EtatFormulaire,
    };
  }
  return { ok: true as const, donnees: resultat.data, valeurs };
}

// Vérifie la famille, résout le type (existant ou nouveau) et prépare les données
async function preparerDonnees(userId: number, donnees: DonneesProduit) {
  const famille = await prisma.famille.findUnique({
    where: { id: donnees.familleId },
    select: { id: true },
  });
  if (!famille) return { erreurs: { familleId: "Famille introuvable." } };

  let typeProduitId: number | null = null;

  if (donnees.nouveauType) {
    // Crée le type s'il n'existe pas déjà pour cet utilisateur
    const type = await prisma.typeProduit.upsert({
      where: { userId_nom: { userId, nom: donnees.nouveauType } },
      update: {},
      create: { userId, nom: donnees.nouveauType },
    });
    typeProduitId = type.id;
  } else if (donnees.typeProduitId) {
    const id = Number(donnees.typeProduitId);
    const type = Number.isInteger(id)
      ? await prisma.typeProduit.findFirst({ where: { id, userId } })
      : null;
    if (!type) return { erreurs: { typeProduitId: "Type introuvable." } };
    typeProduitId = type.id;
  }

  return {
    data: {
      nom: donnees.nom,
      prix: Math.round(donnees.prix * 100) / 100,
      familleId: donnees.familleId,
      typeProduitId,
    },
  };
}

export async function creerProduit(
  _etat: EtatFormulaire,
  formData: FormData
): Promise<EtatFormulaire> {
  const lu = lireFormulaire(formData);
  if (!lu.ok) return lu.etat;

  const userId = await getCurrentUserId();
  const prepare = await preparerDonnees(userId, lu.donnees);
  if ("erreurs" in prepare) {
    return { erreurs: prepare.erreurs, valeurs: lu.valeurs };
  }

  await prisma.produit.create({ data: { userId, ...prepare.data } });

  revalidatePath("/", "layout");
  redirect("/catalogue");
}

export async function modifierProduit(
  id: number,
  _etat: EtatFormulaire,
  formData: FormData
): Promise<EtatFormulaire> {
  const lu = lireFormulaire(formData);
  if (!lu.ok) return lu.etat;

  const userId = await getCurrentUserId();
  const prepare = await preparerDonnees(userId, lu.donnees);
  if ("erreurs" in prepare) {
    return { erreurs: prepare.erreurs, valeurs: lu.valeurs };
  }

  // updateMany + userId : on ne peut modifier que ses propres produits
  const { count } = await prisma.produit.updateMany({
    where: { id, userId, deletedAt: null },
    data: prepare.data,
  });
  if (count === 0) {
    return { message: "Produit introuvable.", valeurs: lu.valeurs };
  }

  revalidatePath("/", "layout");
  redirect("/catalogue");
}

// Soft delete : le produit reste en base (historique d'achat et d'envies)
export async function supprimerProduit(
  id: number
): Promise<{ ok: boolean; message?: string }> {
  if (!Number.isInteger(id)) return { ok: false, message: "Produit introuvable." };

  const userId = await getCurrentUserId();
  const { count } = await prisma.produit.updateMany({
    where: { id, userId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
  if (count === 0) return { ok: false, message: "Produit introuvable." };

  revalidatePath("/", "layout");
  return { ok: true };
}