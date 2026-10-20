"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Produit } from "@/types";

// TODO : ces listes viendront de la base (tables famille, categorie, type_produit)
const familles = ["Alimentation", "Maison"];
const categories = [
  "Produits laitiers",
  "Boulangerie",
  "Épicerie",
  "Hygiène",
  "Entretien",
  "Fruits et légumes",
];
const types = ["Boisson", "Aliment frais", "Aliment sec", "Soin", "Ménage"];

const champ =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600";
const etiquette = "text-sm font-medium text-slate-700";

function Select({
  id,
  label,
  options,
  defaultValue,
}: {
  id: string;
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={etiquette}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        required
        defaultValue={defaultValue ?? ""}
        className={champ}
      >
        <option value="" disabled>
          Choisir…
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ProduitForm({ produit }: { produit?: Produit }) {
  const router = useRouter();
  const modification = Boolean(produit);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO : appeler la Server Action (créer ou modifier le produit en base)
    router.push("/catalogue");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nom" className={etiquette}>
          Nom du produit
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          defaultValue={produit?.nom}
          className={champ}
        />
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
          min="0"
          step="0.01"
          defaultValue={produit?.prix}
          className={champ}
        />
      </div>

      <Select
        id="famille"
        label="Famille"
        options={familles}
        defaultValue={produit?.famille}
      />
      <Select
        id="categorie"
        label="Catégorie"
        options={categories}
        defaultValue={produit?.categorie}
      />
      <Select
        id="typeProduit"
        label="Type de produit"
        options={types}
        defaultValue={produit?.typeProduit?? undefined}
      />

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          {modification ? "Enregistrer les modifications" : "Ajouter le produit"}
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