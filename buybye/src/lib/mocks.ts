import type { Achat, Envie, Produit } from "@/types";

export const produits: Produit[] = [
  { id: 1, nom: "Lait demi-écrémé 1 L", prix: 1.15, categorie: "Produits laitiers", famille: "Alimentation", typeProduit: "Boisson" },
  { id: 2, nom: "Pain de campagne", prix: 2.2, categorie: "Boulangerie", famille: "Alimentation", typeProduit: "Aliment frais" },
  { id: 3, nom: "Pâtes complètes 500 g", prix: 1.6, categorie: "Épicerie", famille: "Alimentation", typeProduit: "Aliment sec" },
  { id: 4, nom: "Gel douche", prix: 3.5, categorie: "Hygiène", famille: "Maison", typeProduit: "Soin" },
  { id: 5, nom: "Liquide vaisselle", prix: 2.1, categorie: "Entretien", famille: "Maison", typeProduit: "Ménage" },
  { id: 6, nom: "Café moulu 250 g", prix: 4.9, categorie: "Épicerie", famille: "Alimentation", typeProduit: "Boisson" },
  { id: 7, nom: "Pommes bio 1 kg", prix: 3.2, categorie: "Fruits et légumes", famille: "Alimentation", typeProduit: "Aliment frais" },
  { id: 8, nom: "Dentifrice", prix: 2.8, categorie: "Hygiène", famille: "Maison", typeProduit: "Soin" },
];

export const achats: Achat[] = [
  { id: 1, produit: produits[0], quantite: 6, date: "2026-10-03" },
  { id: 2, produit: produits[5], quantite: 1, date: "2026-10-03" },
  { id: 3, produit: produits[6], quantite: 2, date: "2026-09-28" },
  { id: 4, produit: produits[3], quantite: 1, date: "2026-09-21" },
  { id: 5, produit: produits[2], quantite: 4, date: "2026-09-14" },
  { id: 6, produit: produits[1], quantite: 2, date: "2026-09-12" },
];

export const envies: Envie[] = [
  { id: 1, produit: produits[4], dateAjout: "2026-10-01" },
  { id: 2, produit: produits[7], dateAjout: "2026-09-25" },
  { id: 3, produit: produits[5], dateAjout: "2026-09-18" },
];
