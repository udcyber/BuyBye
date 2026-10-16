import Link from "next/link";
import { Plus } from "lucide-react";
import { getProduits } from "@/services/produit.service";
import ProduitList from "@/components/produits/ProduitList";

export default async function CataloguePage() {
  const produits = await getProduits();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Catalogue</h1>
          <p className="mt-1 text-slate-600">
            {produits.length} produits disponibles.
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

      <ProduitList produits={produits} avecActions />
    </div>
  );
}