import Link from "next/link";
import NavIcons from "@/components/layout/NavIcons";
import LoginButton from "@/components/auth/LoginButton";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        <Link href="/accueil" className="text-lg font-bold text-emerald-700">
          BuyBye
        </Link>
        <NavIcons />
        <LoginButton />
      </nav>
    </header>
  );
}
