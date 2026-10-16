type Carte = {
  label: string;
  valeur: string;
};

export default function StatsCards({ cartes }: { cartes: Carte[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cartes.map((carte) => (
        <div
          key={carte.label}
          className="rounded-lg border border-slate-200 bg-white p-5"
        >
          <p className="text-sm text-slate-500">{carte.label}</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">
            {carte.valeur}
          </p>
        </div>
      ))}
    </section>
  );
}