import type { Produit } from "@/types";
import { achats, envies, produits } from "@/lib/mocks";

export async function getProduits(): Promise<Produit[]> {
  return produits;
}

export async function getProduitById(id: number): Promise<Produit | null> {
  return produits.find((produit) => produit.id === id) ?? null;
}

export async function getAchats() {
  return [...achats].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEnvies() {
  return envies;
}

export async function getResumeAchats() {
  const liste = await getAchats();
  const totalDepense = liste.reduce(
    (somme, achat) => somme + achat.produit.prix * achat.quantite,
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
    const categorie = achat.produit.categorie;
    parCategorieMap.set(categorie, (parCategorieMap.get(categorie) ?? 0) + montant);
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
