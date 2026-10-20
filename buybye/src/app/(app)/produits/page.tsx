import { getAchats } from "@/services/produit.service";
import { formatDate, formatPrix } from "@/lib/utils";

export default async function HistoriqueAchatPage() {
  const achats = await getAchats();
  const total = achats.reduce(
    (somme, a) => somme + a.prixUnitaire * a.quantite,
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
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}