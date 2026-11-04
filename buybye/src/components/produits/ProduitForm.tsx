"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { creerProduit, modifierProduit } from "@/actions/produit.actions";
import type {
  CategorieAvecFamilles,
  EtatFormulaire,
  Produit,
  TypeOption,
} from "@/types";

const champ =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:bg-slate-100";
const etiquette = "text-sm font-medium text-slate-700";

function Erreur({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

type Props = {
  categories: CategorieAvecFamilles[];
  types: TypeOption[];
  produit?: Produit;
};

export default function ProduitForm({ categories, types, produit }: Props) {
  const action = produit ? modifierProduit.bind(null, produit.id) : creerProduit;
  const [etat, formAction, enAttente] = useActionState<EtatFormulaire, FormData>(
    action,
    {}
  );
  const erreurs = etat.erreurs ?? {};

  // Après une erreur, on réaffiche ce que l'utilisateur avait saisi
  const v = etat.valeurs ?? {
    nom: produit?.nom ?? "",
    prix: produit ? String(produit.prix) : "",
    familleId: produit ? String(produit.familleId) : "",
    typeProduitId: produit?.typeProduitId ? String(produit.typeProduitId) : "",
    nouveauType: "",
  };

  const categorieInitiale = categories.find((c) =>
    c.familles.some((f) => String(f.id) === v.familleId)
  );
  const [categorieId, setCategorieId] = useState(
    categorieInitiale ? String(categorieInitiale.id) : ""
  );
  const familles =
    categories.find((c) => String(c.id) === categorieId)?.familles ?? [];

  return (
    <form action={formAction} className="space-y-4">
      {etat.message && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {etat.message}
        </p>
      )}

      <div>
        <label htmlFor="nom" className={etiquette}>
          Nom du produit
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          defaultValue={v.nom}
          aria-invalid={Boolean(erreurs.nom)}
          aria-describedby={erreurs.nom ? "erreur-nom" : undefined}
          className={champ}
        />
        <Erreur id="erreur-nom" message={erreurs.nom} />
      </div>

      <div>
        <label htmlFor="prix" className={etiquette}>
          Prix unitaire (€)
        </label>
        <input
          id="prix"
          name="prix"
          type="number"
          required
          min="0.01"
          step="0.01"
          defaultValue={v.prix}
          aria-invalid={Boolean(erreurs.prix)}
          aria-describedby={erreurs.prix ? "erreur-prix" : undefined}
          className={champ}
        />
        <Erreur id="erreur-prix" message={erreurs.prix} />
      </div>

      <div>
        <label htmlFor="categorie" className={etiquette}>
          Catégorie (INSEE)
        </label>
        {/* Pas de "name" : sert seulement à filtrer les familles */}
        <select
          id="categorie"
          required
          value={categorieId}
          onChange={(e) => setCategorieId(e.target.value)}
          className={champ}
        >
          <option value="" disabled>
            Choisir…
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="familleId" className={etiquette}>
          Famille
        </label>
        <select
          key={categorieId}
          id="familleId"
          name="familleId"
          required
          disabled={!categorieId}
          defaultValue={
            familles.some((f) => String(f.id) === v.familleId) ? v.familleId : ""
          }
          aria-invalid={Boolean(erreurs.familleId)}
          aria-describedby={erreurs.familleId ? "erreur-famille" : undefined}
          className={champ}
        >
          <option value="" disabled>
            {categorieId ? "Choisir…" : "Choisissez d'abord une catégorie"}
          </option>
          {familles.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nom}
            </option>
          ))}
        </select>
        <Erreur id="erreur-famille" message={erreurs.familleId} />
      </div>

      <div>
        <label htmlFor="typeProduitId" className={etiquette}>
          Type de produit (optionnel)
        </label>
        <select
          id="typeProduitId"
          name="typeProduitId"
          defaultValue={v.typeProduitId}
          aria-describedby={erreurs.typeProduitId ? "erreur-type" : undefined}
          className={champ}
        >
          <option value="">Aucun</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nom}
            </option>
          ))}
        </select>
        <Erreur id="erreur-type" message={erreurs.typeProduitId} />
      </div>

      <div>
        <label htmlFor="nouveauType" className={etiquette}>
          Ou créer un nouveau type
        </label>
        <input
          id="nouveauType"
          name="nouveauType"
          type="text"
          defaultValue={v.nouveauType}
          aria-describedby="aide-nouveau-type"
          className={champ}
        />
        <p id="aide-nouveau-type" className="mt-1 text-xs text-slate-500">
          S'il est rempli, ce champ remplace le choix ci-dessus.
        </p>
        <Erreur id="erreur-nouveau-type" message={erreurs.nouveauType} />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={enAttente}
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-60"
        >
          {enAttente
            ? "Enregistrement…"
            : produit
              ? "Enregistrer les modifications"
              : "Ajouter le produit"}
        </button>
        <Link
          href="/catalogue"
          className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
