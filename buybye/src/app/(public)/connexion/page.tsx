import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function ConnexionPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900">
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-slate-200 bg-white p-6">
        <header>
          <Link href="/" className="text-lg font-bold text-emerald-700">
            BuyBye
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Connexion</h1>
        </header>

        <LoginForm />

        <p className="text-sm text-slate-600">
          Pas encore de compte ?{" "}
          <Link
            href="/inscription"
            className="font-medium text-emerald-700 hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}