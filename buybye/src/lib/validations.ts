export function validerProduit(
  nom: string,
  prixTexte: string,
  famille: string,
  categorie: string,
  typeProduit: string
) {
  const prix = Number(prixTexte);

  if (!nom || !prixTexte || Number.isNaN(prix)) {
    return "Nom et prix obligatoires";
  }

  if (prix <= 0) {
    return "Le prix doit être positif";
  }

  if (!famille || !categorie || !typeProduit) {
    return "Famille, catégorie et type obligatoires";
  }

  return null;
}
