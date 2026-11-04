import Link from "next/link";
import { Heart, Pencil, ShoppingCart } from "lucide-react";
import type { Produit } from "@/types";
import ProduitCard from "@/components/produits/ProduitCard";
import DeleteProduitButton from "@/components/produits/DeleteProduitButton";
import { ajouterAchat } from "@/actions/achat.actions";
import { ajouterEnvie } from "@/actions/envie.actions";

type Props = {
  produits: Produit[];
  avecActions?: boolean;
};

const bouton =
  "flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600 active:scale-95";

  export default function ProduitList({ produits, avecActions = false }: Props) {
  if (produits.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Aucun produit pour le moment.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {produits.map((produit) => (
        <li key={produit.id} className="flex flex-col gap-2">
          <div className="flex-1 [&>article]:h-full">
            <ProduitCard produit={produit} />
          </div>

          {avecActions && (
            <div className="flex flex-wrap items-center gap-2">
              <form action={ajouterAchat}>
                <input type="hidden" name="produitId" value={produit.id} />
                <input type="hidden" name="quantite" value="1" />
                <button
                  type="submit"
                  className={`${bouton} hover:border-emerald-700 hover:text-emerald-800`}
                  aria-label={`J'ai acheté ${produit.nom}`}
                >
                  <ShoppingCart size={16} aria-hidden="true" />
                  Acheté
                </button>
              </form>

              <form action={ajouterEnvie}>
                <input type="hidden" name="produitId" value={produit.id} />
                <button
                  type="submit"
                  className={`${bouton} hover:border-rose-400 hover:text-rose-700`}
                  aria-label={`Ajouter ${produit.nom} aux envies`}
                >
                  <Heart size={16} aria-hidden="true" />
                  Envie
                </button>
              </form>

              <Link href={`/produits/${produit.id}/modifier`} className={`${bouton} hover:border-yellow-1800 hover:bg-yellow-100 hover:text-yellow-950`}>
                <Pencil size={16} aria-hidden="true" />
                Modifier
              </Link>

              <DeleteProduitButton
                produitId={produit.id}
                produitNom={produit.nom}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}