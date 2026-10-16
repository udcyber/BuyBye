import type { Produit } from "@/types";
import { formatPrix } from "@/lib/utils";

export default function ProduitCard({ produit }: { produit: Produit }) {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm text-slate-500">
          {produit.famille} – {produit.typeProduit}
        </p>
        <h3 className="mt-1 font-semibold text-slate-900">{produit.nom}</h3>
        <span className="mt-2 inline-block rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
          {produit.categorie}
        </span>
      </div>
      <p className="mt-4 text-lg font-bold text-slate-900">
        {formatPrix(produit.prix)}
      </p>
    </article>
  );
}