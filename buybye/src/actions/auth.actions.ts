"use server";

import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { ouvrirSession } from "@/lib/auth";
export { lireSession } from "@/lib/auth";


export async function inscrire(nom: string, email: string, motDePasse: string) {
  const emailPropre = email.trim().toLowerCase();
  const emailValide = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailPropre);
  if (emailValide === false) {
    return { ok: false, code: "email" };
  }

  if (motDePasse.length < 6 || motDePasse.length > 72) {
    return { ok: false, code: "longueur" };
  }

  const caracteresAutorises = /^[a-zA-Z0-9!@#$%^&*_+=?.-]+$/;
    const reglesOk=
      /[a-z]/.test(motDePasse) &&
      /[A-Z]/.test(motDePasse) &&
      /[0-9]/.test(motDePasse) &&
      /[!@#$%^^&*_+=?.-]/.test(motDePasse);

  if (caracteresAutorises.test(motDePasse) === false || reglesOk === false) {
    return { ok: false, code: "caracteres" };
  }

  const motDePasseHashe = await argon2.hash(motDePasse, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  const emailDejaPris = await prisma.user.findUnique({
    where: { email: emailPropre },
  });
  if (emailDejaPris) {
    return { ok: false, code: "pris" };
  }

  const compte = await prisma.user.create({
    data: {
      nom,
      email: emailPropre,
      motDePasseHash: motDePasseHashe,
    },
  });

  await ouvrirSession(compte.id);
  return { ok: true };
}

export async function connecter(email: string, motDePasse: string) {
  const emailPropre = email.trim().toLowerCase();
  // Removes spaces and tabs around the email.
  const emailValide = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailPropre);

  if (emailValide === false) {
    return { ok: false };
  }

  const user = await prisma.user.findUnique({
    where: { email: emailPropre },
  });
  if (!user) {
    return { ok: false };
  }

  const bon = await argon2.verify(user.motDePasseHash, motDePasse);
  if (!bon) {
    return { ok: false };
  }

  await ouvrirSession(user.id);
  return { ok: true };
}

export async function fermerSession() {
  const session = await cookies();
  session.delete("session");
}
