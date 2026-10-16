"use server";

import { revalidatePath } from "next/cache";
import { produits } from "@/lib/mocks";
import { validerProduit } from "@/lib/validations";

export async function creerProduit(formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  const prixTexte = String(formData.get("prix") ?? "").trim();
  const prix = Number(prixTexte);
  const erreur = validerProduit(nom, prixTexte);

  if (erreur) {
    return { error: erreur };
  }

  produits.push({
    id: String(Date.now()),
    nom,
    prix,
  });

  revalidatePath("/");
}

export async function modifierProduit(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const nom = String(formData.get("nom") ?? "").trim();
  const prixTexte = String(formData.get("prix") ?? "").trim();
  const prix = Number(prixTexte);
  const produit = produits.find((item) => item.id === id);
  const erreur = validerProduit(nom, prixTexte);

  if (!produit || erreur) {
    return;
  }

  produit.nom = nom;
  produit.prix = prix;
  revalidatePath("/");
}

export async function supprimerProduit(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = produits.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  produits.splice(index, 1);
  revalidatePath("/");
}
