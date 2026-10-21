"use server";

import argon2 from "argon2";
import { prisma } from "@/lib/prisma";

const motsInterdits = [
  "12345678",
  "123456789",
  "1234567890",
  "12345678910",
  "password",
  "password1",
  "pass@123",
  "p@ssw0rd",
  "admin123",
  "admin@123",
  "aa123456",
  "aa@123456",
  "qwerty123",
  "qwertyuiop",
  "iloveyou",
  "11111111",
];

export async function inscrire(nom: string, email: string, motDePasse: string) {
  if (motDePasse.length < 17 || motDePasse.length > 72) {
    return { ok: false };
  }

  if (motDePasse.includes(" ")) {
    return { ok: false };
  }

  if (motsInterdits.includes(motDePasse.toLowerCase())) {
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
  const user = await prisma.utilisateur.findUnique({ where: { email } });
  if (!user) {
    return { ok: false };
  }

  const bon = await argon2.verify(user.motDePasse, motDePasse);
  if (!bon) {
    return { ok: false };
  }

  return { ok: true };
}
