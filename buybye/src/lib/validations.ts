export function validerProduit(nom: string, prixTexte: string) {
  const prix = Number(prixTexte);

  if (!nom || !prixTexte || Number.isNaN(prix)) {
    return "Nom et prix obligatoires";
  }

  if (prix <= 0) {
    return "Le prix doit être positif";
  }

  return null;
}
