"use client";

import { useId, useRef } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { supprimerProduit } from "@/actions/produit.actions";

type Props = {
  produitId: number;
  produitNom: string;
};

export default function DeleteProduitButton({ produitId, produitNom }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titreId = useId();

  async function confirmer() {
  await supprimerProduit(produitId);
  dialogRef.current?.close();
  router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-600"
      >
        <Trash2 size={16} aria-hidden="true" />
        Supprimer
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titreId}
        className="m-auto w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 text-slate-900 backdrop:bg-black/40"
      >
        <h2 id={titreId} className="text-lg font-semibold">
          Supprimer ce produit ?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          « {produitNom} » sera définitivement supprimé. Cette action est
          irréversible.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={confirmer}
            className="rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
          >
            Supprimer
          </button>
        </div>
      </dialog>
    </>
  );
}