"use server";

import { revalidatePath } from "next/cache";
import { achats } from "@/lib/mocks";

export async function ajouterAchat(formData: FormData) {
  const produitId = String(formData.get("produitId") ?? "");

  if (!produitId) {
    return;
  }

  achats.push({ id: String(Date.now()), produitId, quantite: 1 });
  revalidatePath("/");
}

export async function retirerAchat(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = achats.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  achats.splice(index, 1);
  revalidatePath("/");
}
