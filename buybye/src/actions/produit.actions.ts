"use server";

import { revalidatePath } from "next/cache";
import { produits } from "@/lib/mocks";

export async function creerProduit(formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  const prixTexte = String(formData.get("prix") ?? "").trim();
  const prix = Number(prixTexte);

  if (!nom || !prixTexte || Number.isNaN(prix)) {
    return { error: "Nom et prix obligatoires" };
  }

  produits.push({
    id: String(Date.now()),
    nom,
    prix,
  });

  revalidatePath("/");
}
