import Link from "next/link";
import { Plus } from "lucide-react";
import { lireCatalogue } from "@/services/catalogue.service";
import ProduitList from "@/components/produits/ProduitList";

type Props = {
  searchParams: Promise<{ categorie?: string }>;
};

export default async function CataloguePage({ searchParams }: Props) {
  const params = await searchParams;
  const demande = params.categorie ?? "";
  const { produits: tous, categories } = await lireCatalogue();
  const categorie = categories.includes(demande) ? demande : "";
  const produits = categorie
    ? tous.filter((produit) => produit.categorie === categorie)
    : tous;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Catalogue</h1>
          <p className="mt-1 text-slate-600">
            {produits.length} produit{produits.length > 1 ? "s" : ""} disponible{produits.length > 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/produits/nouveau"
          className="flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <Plus size={18} aria-hidden="true" />
          Ajouter un produit
        </Link>
      </header>

      <form method="get" className="flex items-center gap-2">
        <label htmlFor="categorie" className="text-sm font-medium text-slate-700">
          Catégorie
        </label>
        <select
          id="categorie"
          name="categorie"
          defaultValue={categorie}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Toutes</option>
          {categories.map((nom) => (
            <option key={nom} value={nom}>
              {nom}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white"
        >
          Voir
        </button>
      </form>

      <ProduitList produits={produits} avecActions />
    </div>
  );
}
