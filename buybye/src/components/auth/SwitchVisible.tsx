"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const champ =
  "w-full rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600";

export default function SwitchVisible({
  id,
  name,
  label,
  autoComplete,
  minLength,
  maxLength,
}: {
  id: string;
  name: string;
  label?: string;
  autoComplete: string;
  minLength?: number;
  maxLength?: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative mt-1">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required
          minLength={minLength}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={champ}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Cacher le mot de passe" : "Afficher le mot de passe"}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    </div>
  );
}
