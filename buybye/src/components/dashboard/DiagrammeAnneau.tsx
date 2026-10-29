const couleurs = [
  "#047857",
  "#0f766e",
  "#0369a1",
  "#7c3aed",
  "#be123c",
  "#c2410c",
  "#a16207",
  "#334155",
];

type Partie = {
  nom: string;
  montant: number;
};

export default function DiagrammeAnneau({
  titre,
  parties,
}: {
  titre: string;
  parties: Partie[];
}) {
  const total = parties.reduce((somme, part) => somme + part.montant, 0);
  const rayon = 40;
  const tour = 2 * Math.PI * rayon;
  const segments = [];
  let deja = 0;

  for (const part of parties) {
    const longueur = total === 0 ? 0 : (part.montant / total) * tour;
    segments.push({ ...part, longueur, decalage: deja });
    deja += longueur;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">{titre}</h2>
      {total === 0 ? (
        <p className="mt-3 text-sm text-slate-600">Aucune dépense pour ce mois.</p>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <svg viewBox="0 0 120 120" className="h-40 w-40" role="img" aria-label={titre}>
            {segments.map((part, index) => (
              <circle
                key={part.nom}
                cx="60"
                cy="60"
                r={rayon}
                fill="none"
                stroke={couleurs[index % couleurs.length]}
                strokeWidth="16"
                strokeDasharray={`${part.longueur} ${tour - part.longueur}`}
                strokeDashoffset={-part.decalage}
                transform="rotate(-90 60 60)"
              />
            ))}
          </svg>
          <ul className="space-y-1 text-sm">
            {parties.map((part, index) => (
              <li key={part.nom} className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: couleurs[index % couleurs.length] }}
                />
                <span>{part.nom}</span>
                <span className="text-slate-600">
                  {Math.round((part.montant / total) * 100)} %
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
