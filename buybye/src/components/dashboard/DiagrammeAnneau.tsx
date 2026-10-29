"use client";

import { useState } from "react";

const couleurs = ["#047857", "#b45309", "#334155", "#0f766e", "#0369a1", "#65a30d"];

type Partie = {
  nom: string;
  montant: number;
};

function chemin(
  cx: number,
  cy: number,
  rExt: number,
  rInt: number,
  a0: number,
  a1: number,
) {
  const grand = a1 - a0 > Math.PI ? 1 : 0;
  const x0 = cx + Math.cos(a0) * rExt;
  const y0 = cy + Math.sin(a0) * rExt;
  const x1 = cx + Math.cos(a1) * rExt;
  const y1 = cy + Math.sin(a1) * rExt;

  if (rInt <= 0) {
    return `M ${cx} ${cy} L ${x0} ${y0} A ${rExt} ${rExt} 0 ${grand} 1 ${x1} ${y1} Z`;
  }

  const x2 = cx + Math.cos(a1) * rInt;
  const y2 = cy + Math.sin(a1) * rInt;
  const x3 = cx + Math.cos(a0) * rInt;
  const y3 = cy + Math.sin(a0) * rInt;

  return `M ${x0} ${y0} A ${rExt} ${rExt} 0 ${grand} 1 ${x1} ${y1} L ${x2} ${y2} A ${rInt} ${rInt} 0 ${grand} 0 ${x3} ${y3} Z`;
}

export default function DiagrammeAnneau({
  titre,
  parties,
  avecTrou = false,
}: {
  titre: string;
  parties: Partie[];
  avecTrou?: boolean;
}) {
  const [choix, setChoix] = useState<number | null>(null);
  const total = parties.reduce((somme, part) => somme + part.montant, 0);
  const cx = 180;
  const cy = 110;
  const rExt = 70;
  const rInt = avecTrou ? 38 : 0;
  const parts = [];
  let angle = -Math.PI / 2;

  for (const part of parties) {
    const partAngle = total === 0 ? 0 : (part.montant / total) * Math.PI * 2;
    const pourcent = total === 0 ? 0 : Math.round((part.montant / total) * 1000) / 10;
    parts.push({ ...part, a0: angle, a1: angle + partAngle, pourcent });
    angle += partAngle;
  }

  const actif = choix === null ? null : parts[choix];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-center text-lg font-semibold">{titre}</h2>
      {total === 0 ? (
        <p className="mt-3 text-sm text-slate-600">Aucune dépense pour ce mois.</p>
      ) : (
        <>
          <svg viewBox="0 0 360 220" className="mx-auto mt-2 w-full max-w-sm" role="img" aria-label={titre}>
            {parts.map((part, index) => {
              const plein = part.a1 - part.a0 >= Math.PI * 2 - 0.001;
              const couleur = couleurs[index % couleurs.length];
              const visible = choix === null || choix === index;

              return (
                <g
                  key={part.nom}
                  onMouseEnter={() => setChoix(index)}
                  onMouseLeave={() => setChoix(null)}
                  opacity={visible ? 1 : 0.35}
                  className="cursor-pointer"
                >
                  {plein && !avecTrou ? (
                    <circle cx={cx} cy={cy} r={rExt} fill={couleur} />
                  ) : plein && avecTrou ? (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={(rExt + rInt) / 2}
                      fill="none"
                      stroke={couleur}
                      strokeWidth={rExt - rInt}
                    />
                  ) : (
                    <path
                      d={chemin(cx, cy, rExt, rInt, part.a0, part.a1)}
                      fill={couleur}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })}
          </svg>
          <p className="min-h-8 text-center text-xl font-bold text-slate-900">
            {actif ? `${actif.nom} · ${actif.pourcent} %` : "Survolez une partie"}
          </p>
          <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-slate-600">
            {parts.map((part, index) => (
              <li key={part.nom}>
                <span
                  className="mr-1 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: couleurs[index % couleurs.length] }}
                />
                {part.nom} : {part.pourcent} %
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}