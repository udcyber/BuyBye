import { lireStats } from "@/services/stats.service";
import { formatPrix } from "@/lib/utils";
import StatsCards from "@/components/dashboard/StatsCards";

export default async function DashboardPage() {
  const stats = await lireStats();
  const maxCategorie = stats.parCategorie[0]?.montant ?? 0;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-slate-600">Analyse de votre consommation.</p>
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
        <ul className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
          {stats.parCategorie.map(({ categorie, montant }) => (
            <li key={categorie}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{categorie}</span>
                <span className="text-slate-600">
                  {formatPrix(montant)} ({Math.round((montant / stats.total) * 100)} %)
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
      </section>
    </div>
  );
}