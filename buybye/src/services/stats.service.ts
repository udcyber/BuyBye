import { getAchats } from "@/services/produit.service";

export async function lireStats() {
  const liste = await getAchats();
  const montantsParCategorie = new Map<string, number>();
  let total = 0;

  for (const achat of liste) {
    const montant = achat.produit.prix * achat.quantite;
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
