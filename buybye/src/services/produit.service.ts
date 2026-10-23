import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/services/user.service";
import type { Achat, Envie, Produit } from "@/types";

// Un produit est toujours chargé avec sa famille, la catégorie de celle-ci et son type
const produitInclude = {
  famille: { include: { categorie: true } },
  typeProduit: true,
} satisfies Prisma.ProduitInclude;

type ProduitDb = Prisma.ProduitGetPayload<{ include: typeof produitInclude }>;

function toProduit(p: ProduitDb): Produit {
  return {
    id: p.id,
    nom: p.nom,
    prix: p.prix.toNumber(),
    categorie: p.famille.categorie.nom,
    famille: p.famille.nom,
    familleId: p.familleId,
    typeProduit: p.typeProduit?.nom ?? null,
    typeProduitId: p.typeProduitId,
  };
}

function toDateIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function getProduits(): Promise<Produit[]> {
  const userId = await getCurrentUserId();
  const produits = await prisma.produit.findMany({
    where: { userId, deletedAt: null },
    include: produitInclude,
    orderBy: { nom: "asc" },
  });
  return produits.map(toProduit);
}

export async function getProduitById(id: number): Promise<Produit | null> {
  if (!Number.isInteger(id)) return null;
  const userId = await getCurrentUserId();
  const produit = await prisma.produit.findFirst({
    where: { id, userId, deletedAt: null },
    include: produitInclude,
  });
  return produit ? toProduit(produit) : null;
}

export async function getAchats(): Promise<Achat[]> {
  const userId = await getCurrentUserId();
  const achats = await prisma.achat.findMany({
    where: { userId },
    include: { produit: { include: produitInclude } },
    orderBy: [{ dateAchat: "desc" }, { id: "desc" }],
  });
  return achats.map((a) => ({
    id: a.id,
    produit: toProduit(a.produit),
    quantite: a.quantite,
    prixUnitaire: a.prixUnitaire.toNumber(),
    date: toDateIso(a.dateAchat),
  }));
}

export async function getEnvies(): Promise<Envie[]> {
  const userId = await getCurrentUserId();
  const envies = await prisma.envie.findMany({
    where: { userId },
    include: { produit: { include: produitInclude } },
    orderBy: [{ dateAjout: "desc" }, { id: "desc" }],
  });
  return envies.map((e) => ({
    id: e.id,
    produit: toProduit(e.produit),
    dateAjout: toDateIso(e.dateAjout),
  }));
}

export async function getResumeAchats() {
  const liste = await getAchats();
  const totalDepense = liste.reduce(
    (somme, a) => somme + a.prixUnitaire * a.quantite,
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
    const montant = achat.prixUnitaire * achat.quantite;
    total += montant;
    const categorie = achat.produit.categorie;
    parCategorieMap.set(
      categorie,
      (parCategorieMap.get(categorie) ?? 0) + montant
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