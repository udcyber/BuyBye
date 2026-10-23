import { Heart } from "lucide-react";
import type { Envie } from "@/types";
import { formatDate, formatPrix } from "@/lib/utils";
import { retirerEnvie } from "@/actions/envie.actions";

export default function EnvieList({ envies }: { envies: Envie[] }) {
  if (envies.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Votre liste d'envies est vide.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {envies.map((envie) => (
        <li key={envie.id} className="flex items-center gap-4 p-4">
          <Heart
            size={20}
            className="shrink-0 text-rose-600"
            aria-hidden="true"
          />
          <div className="flex-1">
            <p className="font-medium">{envie.produit.nom}</p>
            <p className="text-sm text-slate-500">
              {envie.produit.categorie} – ajouté le {formatDate(envie.dateAjout)}
            </p>
          </div>
          <p className="font-semibold">{formatPrix(envie.produit.prix)}</p>
          <form action={retirerEnvie}>
            <input type="hidden" name="id" value={envie.id} />
            <button
              type="submit"
              aria-label={`Retirer ${envie.produit.nom} des envies`}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-600"
            >
              Retirer
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}