import type { Achat, Envie, Produit } from "@/types";
import { produits } from "@/lib/mocks";
import { prisma } from "@/lib/prisma";

export async function getProduits(): Promise<Produit[]> {
  return prisma.produit.findMany({ orderBy: { id: "asc" } });
}

export async function getProduitById(id: number): Promise<Produit | null> {
  return produits.find((p) => p.id === id) ?? null;
}

export async function getAchats(): Promise<Achat[]> {
  const lignes = await prisma.achat.findMany({
    include: { produit: true },
    orderBy: { date: "desc" },
  });

  return lignes.map((ligne) => ({
    id: ligne.id,
    quantite: ligne.quantite,
    date: ligne.date.toISOString().slice(0, 10),
    produit: ligne.produit as Produit,
  }));
}

export async function getEnvies(): Promise<Envie[]> {
  const lignes = await prisma.envie.findMany({
    include: { produit: true },
    orderBy: { dateAjout: "desc" },
  });

  return lignes.map((ligne) => ({
    id: ligne.id,
    dateAjout: ligne.dateAjout.toISOString().slice(0, 10),
    produit: ligne.produit as Produit,
  }));
}

export async function getResumeAchats() {
  const liste = await getAchats();
  const totalDepense = liste.reduce(
    (somme, a) => somme + a.produit.prix * a.quantite,
    0
  );
  return {
    totalDepense,
    nombreAchats: liste.length,
    derniersAchats: liste.slice(0, 3),
  };
}

export async function getStats() {
  const liste = await getAchats();
  const parCategorieMap = new Map<string, number>();
  let total = 0;

  for (const achat of liste) {
    const montant = achat.produit.prix * achat.quantite;
    total += montant;
    parCategorieMap.set(
      achat.produit.categorie,
      (parCategorieMap.get(achat.produit.categorie) ?? 0) + montant
    );
  }

  const parCategorie = Array.from(parCategorieMap.entries())
    .map(([categorie, montant]) => ({ categorie, montant }))
    .sort((a, b) => b.montant - a.montant);

  return {
    total,
    nombreAchats: liste.length,
    montantMoyen: liste.length > 0 ? total / liste.length : 0,
    parCategorie,
  };
}
