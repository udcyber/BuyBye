import ProduitForm from "@/components/produits/ProduitForm";

export default function NouveauProduitPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Ajouter un produit</h1>
        <p className="mt-1 text-slate-600">
          Renseignez les informations du nouveau produit.
        </p>
      </header>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <ProduitForm />
      </div>
    </div>
  );
}