import { produits } from "@/lib/mocks";

export function lireTotal() {
  return produits.reduce((total, produit) => total + produit.prix, 0);
}
