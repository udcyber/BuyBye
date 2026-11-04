import { getProduits } from "@/services/produit.service";

export async function lireCatalogue(categorie?: string) {
  const produits = await getProduits();
  const categories = [...new Set(produits.map((produit) => produit.categorie))].sort();

  if (!categorie) {
    return { produits, categories };
  }

  return {
    produits: produits.filter((produit) => produit.categorie === categorie),
    categories,
  };
}
