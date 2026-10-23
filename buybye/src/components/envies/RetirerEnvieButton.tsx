"use client";

import { retirerEnvie } from "@/actions/envie.actions";

export default function RetirerEnvieButton({ envieId }: { envieId: number }) {
  return (
    <button
      type="button"
      onClick={() => retirerEnvie(envieId)}
      className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
    >
      Retirer
    </button>
  );
}
