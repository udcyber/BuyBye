"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center text-slate-900">
      <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
      <p className="text-slate-600">
        Quelque chose s'est mal passé. Vous pouvez réessayer.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
      >
        Réessayer
      </button>
    </main>
  );
}