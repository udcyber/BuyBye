"use server";

import { revalidatePath } from "next/cache";
import { envies } from "@/lib/mocks";

export async function ajouterEnvie(formData: FormData) {
  const produitId = String(formData.get("produitId") ?? "");

  if (!produitId) {
    return;
  }

  envies.push({ id: String(Date.now()), produitId });
  revalidatePath("/");
}

export async function retirerEnvie(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const index = envies.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  envies.splice(index, 1);
  revalidatePath("/");
}
