"use server";

import { revalidatePath } from "next/cache";
import { achats, produits } from "@/lib/mocks";

export async function ajouterAchat(formData: FormData) {
  const produitId = Number(formData.get("produitId"));
  const quantite = Number(formData.get("quantite") ?? 1);
  const produit = produits.find((item) => item.id === produitId);

  if (!produit || quantite <= 0) {
    return;
  }

  achats.push({
    id: Date.now(),
    produit,
    quantite,
    date: new Date().toISOString().slice(0, 10),
  });
  revalidatePath("/accueil");
  revalidatePath("/dashboard");
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
