"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Produit } from "@/types";
import { creerProduit, modifierProduit } from "@/actions/produit.actions";

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

export default function ProduitForm({
  produit,
  familles,
  categories,
  types,
}: {
  produit?: Produit;
  familles: string[];
  categories: string[];
  types: string[];
}) {
  const router = useRouter();
  const modification = Boolean(produit);
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (produit) {
      formData.set("id", String(produit.id));
    }

    const resultat = produit
      ? await modifierProduit(formData)
      : await creerProduit(formData);

    if (resultat?.error) {
      setErreur(resultat.error);
      return;
    }

    router.push("/catalogue");
    router.refresh();
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
        defaultValue={produit?.typeProduit}
      />

      {erreur ? <p className="text-sm text-red-700">{erreur}</p> : null}

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
