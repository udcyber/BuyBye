"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inscrire } from "@/actions/auth.actions";
import SwitchVisible from "@/components/auth/SwitchVisible"

const champ =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600";

export default function RegisterForm() {
  const router = useRouter();
  const [erreur, setErreur] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    const motDePasse = String(donnees.get("motDePasse") ?? "");

    if (motDePasse !== String(donnees.get("confirmation") ?? "")) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    const resultat = await inscrire(
      String(donnees.get("nom") ?? ""),
      String(donnees.get("email") ?? ""),
      motDePasse
    );

    if (!resultat.ok) {
      const messages: { [clef: string]: string } = {
        email: "Adresse e-mail invalide.",
        longueur: "Le mot de passe doit contenir entre 6 et 72 caractères.",
        caracteres:
          "Une minuscule, une majuscule, un chiffre et un caractère spécial (!@#$%^&*_+=?.-).",
        pris: "Cette adresse e-mail est déjà utilisée.",
      };
      setErreur(messages[resultat.code] ?? "Inscription refusée.");
      return;
    }

    router.push("/accueil");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nom" className="text-sm font-medium text-slate-700">
          Nom ou pseudo
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          autoComplete="nickname"
          className={champ}
        />
      </div>

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

      <div>
        <label htmlFor="motDePasse" className="text-sm font-medium text-slate-700">
          Mot de passe (6 à 72 caractères)
        </label>
        <SwitchVisible
          id="motDePasse"
          name="motDePasse"
          autoComplete="password"
          minLength={6}
          maxLength={72}
        />
      </div>

      <div>
        <label htmlFor="confirmation" className="text-sm font-medium text-slate-700">
          Confirmer le mot de passe
        </label>
        <SwitchVisible
          id="confirmation"
          name="confirmation"
          autoComplete="new-password"
          minLength={6}
          maxLength={72}
        />
      </div>

      {erreur && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        Créer mon compte
      </button>
    </form>
  );
}