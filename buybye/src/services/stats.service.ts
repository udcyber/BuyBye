import { getAchats, getEnvies } from "@/services/produit.service";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";

export async function lireStats(mois: string) {
  const listeComplete = await getAchats();
  const liste = listeComplete.filter((achat) => achat.date.startsWith(mois));
  const montantsParCategorie = new Map<string, number>();
  const montantsParFamille = new Map<string, number>();
  let total = 0;

  for (const achat of liste) {
    const montant = achat.prixUnitaire * achat.quantite;
    total += montant;
    montantsParCategorie.set(
      achat.produit.categorie,
      (montantsParCategorie.get(achat.produit.categorie) ?? 0) + montant
    );
    montantsParFamille.set(
      achat.produit.famille,
      (montantsParFamille.get(achat.produit.famille) ?? 0) + montant
    );
  }

  const parCategorie = Array.from(montantsParCategorie.entries())
    .map(([categorie, montant]) => ({ categorie, montant }))
    .sort((a, b) => b.montant - a.montant);
  const parFamille = Array.from(montantsParFamille.entries())
    .map(([famille, montant]) => ({ famille, montant }))
    .sort((a, b) => b.montant - a.montant);

  return {
    total,
    nombreAchats: liste.length,
    montantMoyen: liste.length > 0 ? total / liste.length : 0,
    parCategorie,
    parFamille,
  };
}

export async function lireTotalEnvies() {
  const envies = await getEnvies();
  let total = 0;

  for (const envie of envies) {
    total += envie.produit.prix;
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

export async function lirePlafonds() {
  const userId = await getCurrentUserId();
  const lignes = await prisma.plafond.findMany({
    where: { userId },
    include: { categorie: true },
  });

  return lignes.map((ligne) => ({
    categorieId: ligne.categorieId,
    categorie: ligne.categorie.nom,
    montant: ligne.montant.toNumber(),
  }));
}

export async function lireDepensesParMois(annee: string) {
  const liste = await getAchats();
  const noms = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
  ];

  return noms.map((nom, index) => {
    const numero = String(index + 1).padStart(2, "0");
    const cle = `${annee}-${numero}`;
    let montant = 0;

    for (const achat of liste) {
      if (achat.date.startsWith(cle)) {
        montant += achat.prixUnitaire * achat.quantite;
      }
    }

    return { mois: nom, montant };
  });
}
