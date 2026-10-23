import { getAchats } from "@/services/produit.service";
import { formatDate, formatPrix } from "@/lib/utils";
import { retirerAchat } from "@/actions/achat.actions";

export default async function HistoriqueAchatPage() {
  const achats = await getAchats();
  const total = achats.reduce((somme, a) => somme + a.prixUnitaire * a.quantite, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Historique d'achat</h1>
        <p className="mt-1 text-slate-600">
          Tous vos achats, du plus récent au plus ancien.
        </p>
      </header>

      {achats.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          Aucun achat enregistré. Ajoutez-en depuis le catalogue.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Produit</th>
                <th className="px-4 py-3 text-right font-medium">Quantité</th>
                <th className="px-4 py-3 text-right font-medium">Prix unitaire</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {achats.map((achat) => (
                <tr key={achat.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatDate(achat.date)}
                  </td>
                  <td className="px-4 py-3">{achat.produit.nom}</td>
                  <td className="px-4 py-3 text-right">{achat.quantite}</td>
                  <td className="px-4 py-3 text-right">
                    {formatPrix(achat.prixUnitaire)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatPrix(achat.prixUnitaire * achat.quantite)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <form action={retirerAchat}>
                      <input type="hidden" name="id" value={achat.id} />
                      <button
                        type="submit"
                        aria-label={`Retirer l'achat de ${achat.produit.nom}`}
                        className="rounded-md px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-600"
                      >
                        Retirer
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50">
              <tr>
                <td colSpan={4} className="px-4 py-3 text-right font-semibold">
                  Total
                </td>
                <td className="px-4 py-3 text-right font-bold text-emerald-700">
                  {formatPrix(total)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
