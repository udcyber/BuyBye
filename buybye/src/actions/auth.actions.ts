"use server";

import argon2 from "argon2";
import { prisma } from "@/lib/prisma";

export async function inscrire(nom: string, email: string, motDePasse: string) {
  if (motDePasse.length < 17 || motDePasse.length > 72) {
    return { ok: false };
  }

  if (motDePasse.includes(" ")) {
    return { ok: false };
  }

  for (const lettre of motDePasse) {
    if (lettre.charCodeAt(0) > 127) {
      return { ok: false };
    }
  }

  const motDePasseHashe = await argon2.hash(motDePasse, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  const emailDejaPris = await prisma.utilisateur.findUnique({ where: { email } });
  if (emailDejaPris) {
    return { ok: false };
  }

  await prisma.utilisateur.create({
    data: {
      nom,
      email,
      motDePasse: motDePasseHashe,
    },
  });

  return { ok: true };
}

export async function connecter(email: string, motDePasse: string) {
  const emailPropre = email.trim();
  // Removes spaces and tabs around the email.
  const emailValide = /^.+@.+\..+$/.test(emailPropre);

  if (emailValide === false) {
    return { ok: false };
  }

  const user = await prisma.utilisateur.findUnique({
    where: { email: emailPropre },
  });
  if (!user) {
    return { ok: false };
  }

  const bon = await argon2.verify(user.motDePasse, motDePasse);
  if (!bon) {
    return { ok: false };
  }

  return { ok: true };
}
