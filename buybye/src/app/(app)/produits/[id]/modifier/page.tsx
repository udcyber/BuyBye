import { notFound } from "next/navigation";
import { getProduitById } from "@/services/produit.service";
import ProduitForm from "@/components/produits/ProduitForm";

export default async function ModifierProduitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produit = await getProduitById(Number(id));

  if (!produit) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Modifier le produit</h1>
        <p className="mt-1 text-slate-600">{produit.nom}</p>
      </header>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <ProduitForm produit={produit} />
      </div>
    </div>
  );
}