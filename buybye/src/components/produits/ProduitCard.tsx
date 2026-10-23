import type { Produit } from "@/types";
import { formatPrix } from "@/lib/utils";

export default function ProduitCard({ produit }: { produit: Produit }) {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm text-slate-500">{produit.categorie}</p>
        <h3 className="mt-1 font-semibold text-slate-900">{produit.nom}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
            {produit.famille}
          </span>
          {produit.typeProduit && (
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
              {produit.typeProduit}
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 text-lg font-bold text-slate-900">
        {formatPrix(produit.prix)}
      </p>
    </article>
  );
}