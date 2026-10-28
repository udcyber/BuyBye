import { getAchats, getEnvies } from "@/services/produit.service";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";

export async function lireStats(mois: string) {
  const listeComplete = await getAchats();
  const liste = listeComplete.filter((achat) => achat.date.startsWith(mois));
  const montantsParCategorie = new Map<string, number>();
  let total = 0;

  for (const achat of liste) {
    const montant = achat.prixUnitaire * achat.quantite;
    total += montant;
    montantsParCategorie.set(
      achat.produit.categorie,
      (montantsParCategorie.get(achat.produit.categorie) ?? 0) + montant
    );
  }

  const parCategorie = Array.from(montantsParCategorie.entries())
    .map(([categorie, montant]) => ({ categorie, montant }))
    .sort((a, b) => b.montant - a.montant);

  return {
    total,
    nombreAchats: liste.length,
    montantMoyen: liste.length > 0 ? total / liste.length : 0,
    parCategorie,
  };
}

export async function lireTotalEnvies() {
  const envies = await getEnvies();
  let total = 0;

  for (const envie of envies) {
    total += envie.produit.prix
  }

  return total;
}

export async function lireBudget(mois: string) {
  const userId = await getCurrentUserId();
  const budget = await prisma.budget.findUnique({
    where: { userId_mois: { userId, mois } },
  });

  if (!budget) {
    return 0;
  }

  return budget.montant.toNumber();
}
