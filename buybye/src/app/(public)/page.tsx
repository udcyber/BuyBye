import Link from "next/link";

const avantages = [
  {
    titre: "Suivez vos achats",
    texte: "Gardez un historique clair de tout ce que vous achetez.",
  },
  {
    titre: "Parcourez le catalogue",
    texte: "Retrouvez vos produits par famille, catégorie et type.",
  },
  {
    titre: "Analysez votre consommation",
    texte: "Repérez où part votre budget et ajustez vos habitudes.",
  },
];

export default function AccueilPublicPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold text-emerald-700">BuyBye</span>
          <div className="flex items-center gap-2">
            <Link
              href="/connexion"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-800"
            >
              Inscription
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16">
        <section className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Consommez mieux, dépensez juste.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            BuyBye vous aide à suivre vos achats et à comprendre votre
            consommation, pour acheter ce dont vous avez vraiment besoin.
          </p>
          <Link
            href="/inscription"
            className="mt-8 inline-block rounded-md bg-emerald-700 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Créer mon compte
          </Link>
        </section>

        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          {avantages.map((a) => (
            <div
              key={a.titre}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <h2 className="font-semibold">{a.titre}</h2>
              <p className="mt-2 text-sm text-slate-600">{a.texte}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}