export type Produit = {
  id: number;
  nom: string;
  prix: number; // prix unitaire en euros
  categorie: string;
  famille: string;
  typeProduit: string;
};

export type Achat = {
  id: number;
  produit: Produit;
  quantite: number;
  date: string; // format ISO : "2026-10-02"
};

export type Envie = {
  id: number;
  produit: Produit;
  dateAjout: string; // format ISO : "2026-10-01"
};