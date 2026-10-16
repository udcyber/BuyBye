import { getEnvies } from "@/services/produit.service";
import EnvieList from "@/components/envies/EnvieList";
import { formatPrix } from "@/lib/utils";

export default async function EnviePage() {
  const envies = await getEnvies();
  const totalEstime = envies.reduce((somme, e) => somme + e.produit.prix, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Liste d'envies</h1>
        <p className="mt-1 text-slate-600">
          {envies.length} produit{envies.length > 1 ? "s" : ""} – total estimé :{" "}
          <span className="font-semibold text-slate-900">
            {formatPrix(totalEstime)}
          </span>
        </p>
      </header>

      <EnvieList envies={envies} />
    </div>
  );
}