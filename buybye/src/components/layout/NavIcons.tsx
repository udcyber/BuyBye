"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Store, Receipt, Heart, LayoutDashboard } from "lucide-react";

const liens = [
  { href: "/accueil", label: "Accueil", icon: House },
  { href: "/catalogue", label: "Catalogue", icon: Store },
  { href: "/produits", label: "Historique d'achat", icon: Receipt },
  { href: "/envie", label: "Envies", icon: Heart },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function NavIcons() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {liens.map(({ href, label, icon: Icon }) => {
        const actif = pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={actif ? "page" : undefined}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 ${
                actif
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="hidden lg:inline">{label}</span>
              <span className="sr-only lg:hidden">{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
