"use server";

import argon2 from "argon2";
import { prisma } from "@/lib/prisma";

export async function inscrire(nom: string, email: string, motDePasse: string) {
  const emailPropre = email.trim().toLowerCase();
  const emailValide = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailPropre);
  
  if (emailValide === false) {
    return { ok: false };
  }

  if (motDePasse.length < 6 || motDePasse.length > 72) {
    return { ok: false };
  }

  const caracteresOk = /^[a-zA-Z0-9!@#$%^&*_+=?.-]+$/;
  if (caracteresOk.test(motDePasse) === false) {
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

  const emailDejaPris = await prisma.utilisateur.findUnique({
    where: { email: emailPropre },
  });
  if (emailDejaPris) {
    return { ok: false };
  }

  await prisma.utilisateur.create({
    data: {
      nom,
      email: emailPropre,
      motDePasse: motDePasseHashe,
    },
  });

  return { ok: true };
}

export async function connecter(email: string, motDePasse: string) {
  const emailPropre = email.trim().toLowerCase();
  // Removes spaces and tabs around the email.
  const emailValide = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailPropre);

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
