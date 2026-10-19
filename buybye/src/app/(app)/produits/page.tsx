import { getAchats } from "@/services/produit.service";
import { retirerAchat } from "@/actions/achat.actions";
import { formatDate, formatPrix } from "@/lib/utils";

export default async function HistoriqueAchatPage() {
  const achats = await getAchats();
  const total = achats.reduce(
    (somme, a) => somme + a.produit.prix * a.quantite,
    0
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Historique d'achat</h1>
        <p className="mt-1 text-slate-600">
          Tous vos achats, du plus récent au plus ancien.
        </p>
      </header>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Produit</th>
              <th className="px-4 py-3 text-right font-medium">Quantité</th>
              <th className="px-4 py-3 text-right font-medium">Prix unitaire</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 font-medium"></th>
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
                  {formatPrix(achat.produit.prix)}
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {formatPrix(achat.produit.prix * achat.quantite)}
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={retirerAchat}>
                    <input type="hidden" name="id" value={achat.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-red-600 px-3 py-2 text-sm font-medium text-red-600"
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
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
