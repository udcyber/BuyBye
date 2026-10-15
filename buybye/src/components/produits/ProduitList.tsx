import Link from "next/link";
import { Pencil } from "lucide-react";
import type { Produit } from "@/types";
import ProduitCard from "@/components/produits/ProduitCard";
import DeleteProduitButton from "@/components/produits/DeleteProduitButton";

type Props = {
  produits: Produit[];
  avecActions?: boolean;
};

export default function ProduitList({ produits, avecActions = false }: Props) {
  if (produits.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Aucun produit pour le moment.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {produits.map((produit) => (
        <li key={produit.id} className="flex flex-col gap-2">
          <div className="flex-1 [&>article]:h-full">
            <ProduitCard produit={produit} />
          </div>

          {avecActions && (
            <div className="flex items-center gap-2">
              <Link
                href={`/produits/${produit.id}/modifier`}
                className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600"
              >
                <Pencil size={16} aria-hidden="true" />
                Modifier
              </Link>
              <DeleteProduitButton
                produitId={produit.id}
                produitNom={produit.nom}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}