import type { Achat, Envie, Produit } from "@/types";

export const produits: Produit[] = [
  { id: "1", nom: "Robot de ménage", prix: 982.50 },
  { id: "2", nom: "Guitare électrique", prix: 112.99 },
];

export const achats: Achat[] = [];
export const envies: Envie[] = [];

export const familles = [{ id: "1", nom: "Alimentation" }];
export const categories = [{ id: "1", nom: "Courses" }];
export const typesProduit = [{ id: "1", nom: "Unité" }];
