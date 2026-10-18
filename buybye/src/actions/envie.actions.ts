"use server";

import { revalidatePath } from "next/cache";
import { envies, produits } from "@/lib/mocks";

export async function ajouterEnvie(formData: FormData) {
  const produitId = Number(formData.get("produitId"));
  const produit = produits.find((item) => item.id === produitId);

  if (!produit) {
    return;
  }

  envies.push({
    id: Date.now(),
    produit,
    dateAjout: new Date().toISOString().slice(0, 10),
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
