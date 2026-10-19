"use server";

import { revalidatePath } from "next/cache";
import { produits } from "@/lib/mocks";
import { validerProduit } from "@/lib/validations";
import { prisma } from "@/lib/prisma";

function revalider() {
  revalidatePath("/catalogue");
  revalidatePath("/produits");
  revalidatePath("/accueil");
  revalidatePath("/dashboard");
}

export async function creerProduit(formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  const prixTexte = String(formData.get("prix") ?? "").trim();
  const famille = String(formData.get("famille") ?? "").trim();
  const categorie = String(formData.get("categorie") ?? "").trim();
  const typeProduit = String(formData.get("typeProduit") ?? "").trim();
  const erreur = validerProduit(nom, prixTexte, famille, categorie, typeProduit);

  if (erreur) {
    return { error: erreur };
  }

  produits.push({
    id: produits.reduce((max, p) => Math.max(max, p.id), 0) + 1,
    nom,
    prix: Number(prixTexte),
    famille,
    categorie,
    typeProduit,
  });
  revalider();
}

export async function modifierProduit(formData: FormData) {
  const id = Number(formData.get("id"));
  const nom = String(formData.get("nom") ?? "").trim();
  const prixTexte = String(formData.get("prix") ?? "").trim();
  const famille = String(formData.get("famille") ?? "").trim();
  const categorie = String(formData.get("categorie") ?? "").trim();
  const typeProduit = String(formData.get("typeProduit") ?? "").trim();
  const erreur = validerProduit(nom, prixTexte, famille, categorie, typeProduit);

  if (erreur) {
    return { error: erreur };
  }

  await prisma.produit.update({
    where: { id: id },
    data: {
      nom: nom,
      prix: Number(prixTexte),
      famille: famille,
      categorie: categorie,
      typeProduit: typeProduit,
    },
  });
  revalider();
}

export async function supprimerProduit(id: number) {
  const index = produits.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  produits.splice(index, 1);
  revalider();
}
