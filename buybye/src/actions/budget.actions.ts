"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";

export async function enregistrerBudget(formData: FormData) {
  const mois = String(formData.get("mois") ?? "");
  const montantTexte = String(formData.get("montant") ?? "").trim();
  const montant = Number(montantTexte);
  const userId = await getCurrentUserId();

  if (!/^\d{4}-\d{2}$/.test(mois) || montantTexte === "" || Number.isNaN(montant) || montant < 0) {
    return;
  }

  await prisma.budget.upsert({
    where: { userId_mois: { userId, mois } },
    update: { montant },
    create: { userId, mois, montant },
  });

  revalidatePath("/dashboard");
}
