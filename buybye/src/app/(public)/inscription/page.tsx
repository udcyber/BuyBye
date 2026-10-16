import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function InscriptionPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900">
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-slate-200 bg-white p-6">
        <header>
          <Link href="/" className="text-lg font-bold text-emerald-700">
            BuyBye
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Créer un compte</h1>
        </header>

        <RegisterForm />

        <p className="text-sm text-slate-600">
          Déjà inscrit ?{" "}
          <Link
            href="/connexion"
            className="font-medium text-emerald-700 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}