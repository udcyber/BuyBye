import Link from "next/link";
import { getResumeAchats } from "@/services/produit.service";
import { formatDate, formatPrix } from "@/lib/utils";

export default async function AccueilPage() {
  const { totalDepense, nombreAchats, derniersAchats } =
    await getResumeAchats();

  return (
    <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 text-slate-900">
      <header>
        <h1 className="text-2xl font-bold">Bonjour, bienvenue sur BuyBye</h1>
        <p className="mt-1 text-slate-600">
          Voici un aperçu de votre consommation.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-sm text-slate-500">Total dépensé</p>
          <p className="mt-1 text-3xl font-bold text-emerald-700">
            {formatPrix(totalDepense)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Achats enregistrés</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {nombreAchats}
          </p>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Derniers achats</h2>
          <Link
            href="/produits"
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            Voir tout l'historique
          </Link>
        </div>
        {derniersAchats.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Aucun achat pour le moment.
          </p>
        ) : (
          <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {derniersAchats.map((achat) => (
              <li
                key={achat.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <p className="font-medium">{achat.produit.nom}</p>
                  <p className="text-sm text-slate-500">
                    {formatDate(achat.date)} – quantité : {achat.quantite}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrix(achat.prixUnitaire * achat.quantite)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Link
        href="/catalogue"
        className="inline-block rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
      >
        Parcourir le catalogue
      </Link>
    </div>
  );
}