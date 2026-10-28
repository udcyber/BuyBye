import { lireBudget, lireStats, lireTotalEnvies } from "@/services/stats.service";
import { formatPrix } from "@/lib/utils";
import StatsCards from "@/components/dashboard/StatsCards";

type Props = {
  searchParams: Promise<{ mois?: string }>;
};

function moisActuel() {
  return new Date().toISOString().slice(0, 7);
}

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const demande = params.mois ?? "";
  const mois = /^\d{4}-\d{2}$/.test(demande) ? demande : moisActuel();
  const stats = await lireStats(mois);
  const totalEnvies = await lireTotalEnvies();
  const budget = await lireBudget(mois);
  const reste = budget - stats.total;
  const maxCategorie = stats.parCategorie[0]?.montant ?? 0;

  return (
    <div className="space-y-8">
      <header>
        <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Achats et envies</h2>
        <p className="mt-2 text-slate-700">
            Achats du mois : {formatPrix(stats.total)}. Liste d'envies :{" "}
            {formatPrix(totalEnvies)}.
        </p>
        <p className="mt-1 text-slate-600">
            {totalEnvies === 0
            ? "Aucune envie pour le moment."
            : `Si vous achetiez toute la liste, le mois passerait à ${formatPrix(stats.total + totalEnvies)}.`}
        </p>
        </section>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-slate-600">Achats du mois {mois}.</p>
        <form method="get" className="mt-4 flex items-center gap-2">
          <label htmlFor="mois" className="text-sm font-medium text-slate-700">
            Mois
          </label>
          <input
            id="mois"
            name="mois"
            type="month"
            defaultValue={mois}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white"
          >
            Voir
          </button>
        </form>
        <p className="mt-3 text-slate-700">
          {budget === 0
            ? "Aucun budget enregistré pour ce mois."
            : reste >= 0
              ? `Il reste ${formatPrix(reste)} sur ${formatPrix(budget)}.`
              : `Vous avez dépassé le budget de ${formatPrix(Math.abs(reste))}.`}
        </p>
      </header>

      <StatsCards
        cartes={[
          { label: "Total dépensé", valeur: formatPrix(stats.total) },
          { label: "Achats enregistrés", valeur: String(stats.nombreAchats) },
          {
            label: "Montant moyen par achat",
            valeur: formatPrix(stats.montantMoyen),
          },
          {
            label: "Catégorie la plus coûteuse",
            valeur: stats.parCategorie[0]?.categorie ?? "–",
          },
        ]}
      />

      <section>
        <h2 className="mb-3 text-lg font-semibold">Dépenses par catégorie</h2>
        {stats.parCategorie.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Aucun achat pour ce mois.
          </p>
        ) : (
          <ul className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
            {stats.parCategorie.map(({ categorie, montant }) => (
              <li key={categorie}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{categorie}</span>
                  <span className="text-slate-600">
                    {formatPrix(montant)} (
                    {Math.round((montant / stats.total) * 100)} %)
                  </span>
                </div>
                <div className="mt-1 h-2 rounded bg-slate-100" aria-hidden="true">
                  <div
                    className="h-2 rounded bg-emerald-600"
                    style={{ width: `${(montant / maxCategorie) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
