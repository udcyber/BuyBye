export type Produit = {
  id: string;
  nom: string;
  prix: number;
};

export type Achat = {
  id: string;
  produitId: string;
  quantite: number;
};

export type Envie = {
  id: string;
  produitId: string;
};

export type Utilisateur = {
  id: string;
  email: string;
};
