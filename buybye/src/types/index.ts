export type Produit = {
  id: number;
  nom: string;
  prix: number; // prix actuel du produit, en euros
  categorie: string; // catégorie INSEE, déduite de la famille
  famille: string;
  typeProduit: string | null; // type personnel, optionnel
};

export type Achat = {
  id: number;
  produit: Produit;
  quantite: number;
  prixUnitaire: number; // prix payé au moment de l'achat
  date: string; // format ISO : "2026-10-03"
};

export type Envie = {
  id: number;
  produit: Produit;
  dateAjout: string; // format ISO : "2026-10-01"
};