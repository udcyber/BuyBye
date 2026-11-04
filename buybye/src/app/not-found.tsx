import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center text-slate-900">
      <p className="text-5xl font-bold text-emerald-700">404</p>
      <h1 className="text-2xl font-bold">Page introuvable</h1>
      <p className="text-slate-600">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}