import { formatPrix } from "@/lib/utils";

type Point = {
  mois: string;
  montant: number;
};

export default function CourbeMois({ points }: { points: Point[] }) {
  const largeur = 360;
  const hauteur = 140;
  const max = Math.max(...points.map((point) => point.montant), 1);
  const pas = largeur / (points.length - 1);

  const coords = points.map((point, index) => ({
    ...point,
    x: index * pas,
    y: hauteur - (point.montant / max) * (hauteur - 16) - 8,
  }));
  const ligne = coords.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Évolution des dépenses</h2>
      <svg viewBox={`0 0 ${largeur} ${hauteur + 28}`} className="mt-4 w-full" role="img">
        <polyline fill="none" stroke="#047857" strokeWidth="2" points={ligne} />
        {coords.map((point) => (
          <g key={point.mois}>
            <circle cx={point.x} cy={point.y} r="3" fill="#047857">
              <title>{`${point.mois} : ${formatPrix(point.montant)}`}</title>
            </circle>
            <text
              x={point.x}
              y={hauteur + 18}
              textAnchor="middle"
              fill="#475569"
              fontSize="10"
            >
              {point.mois}
            </text>
          </g>
        ))}
      </svg>
    </section>
  );
}
