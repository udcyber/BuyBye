export type Produit = {
  id: number;
  nom: string;
  prix: number; // prix actuel du produit, en euros
  categorie: string; // catégorie INSEE, déduite de la famille
  famille: string;
  familleId: number;
  typeProduit: string | null; // type personnel, optionnel
  typeProduitId: number | null;
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

export type CategorieAvecFamilles = {
  id: number;
  nom: string;
  familles: { id: number; nom: string }[];
};

export type TypeOption = {
  id: number;
  nom: string;
};

// État renvoyé par les Server Actions des formulaires
export type EtatFormulaire = {
  erreurs?: { [cle: string]: string | undefined };
  message?: string;
  valeurs?: {
    nom: string;
    prix: string;
    familleId: string;
    typeProduitId: string;
    nouveauType: string;
  };
};