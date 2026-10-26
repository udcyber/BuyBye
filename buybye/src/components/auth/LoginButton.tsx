"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { fermerSession } from "@/actions/auth.actions";

const style =
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600";

export default function LoginButton({
  connecte = true,
}: {
  connecte?: boolean;
}) {
  const router = useRouter();

  async function deconnexion() {
    await fermerSession();
    router.push("/");
  }

  if (!connecte) {
    return (
      <Link href="/connexion" className={style}>
        <LogIn size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Connexion</span>
        <span className="sr-only sm:hidden">Connexion</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={deconnexion} className={style}>
      <LogOut size={18} aria-hidden="true" />
      <span className="hidden sm:inline">Déconnexion</span>
      <span className="sr-only sm:hidden">Déconnexion</span>
    </button>
  );
}