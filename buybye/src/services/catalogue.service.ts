import { getProduits } from "@/services/produit.service";

export async function lireCatalogue() {
  return getProduits();
}
