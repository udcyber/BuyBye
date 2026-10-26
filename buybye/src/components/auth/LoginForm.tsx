"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { connecter } from "@/actions/auth.actions";
import SwitchVisible from "@/components/auth/SwitchVisible";

const champ =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600";

export default function LoginForm() {
  const router = useRouter();
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    const email = String(donnees.get("email") ?? "").trim();
    const motDePasse = String(donnees.get("motDePasse") ?? "");
    const emailValide = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email);
    // Regex Syntax:
        // ^   = start of the text
        // @   = the required @
        // \.  = the required dot (.)
        // $   = end of the text
        // for instance: text@text.text

    if (emailValide === false) {
      setErreur("Adresse e-mail invalide.");
      return;
    }

    const resultat = await connecter(email, motDePasse);
    if (!resultat.ok) {
      setErreur("E-mail ou mot de passe incorrect.");
      return;
    }

    router.push("/accueil");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={champ}
        />
      </div>
      <SwitchVisible
        id="motDePasse"
        name="motDePasse"
        label= "Mot de passe"
        autoComplete="current-password"
       />

      {erreur && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {erreur}
        </p>
      )}
      <button
        type="submit"
        className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        Se connecter
      </button>
    </form>
  );
}