"use server";

import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { ouvrirSession } from "@/lib/auth";

export async function inscrire(nom: string, email: string, motDePasse: string) {
  const nomPseudo = nom.trim().replace(/ +/g, " ");
  // " +"  = one space or more
  // g     = means here: if " " is found anywhere in the text
  const nomValide = /^[\p{L}0-9 '-]+$/u.test(nomPseudo);
  // \p{L}  = accepts all small print, big print, accents
  if (nomPseudo.length < 2 || nomPseudo.length > 12 || nomValide === false) {
    return { ok: false, code: "nom" };
  }

  const emailPropre = email.trim().toLowerCase();
  const emailValide = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailPropre);
  // Regex Syntax:
  // ^   = start of the text
  // @   = the required @
  // \.  = the required dot (.)
  // $   = end of the text
  // for instance: text@text.text
  if (emailValide === false) {
    return { ok: false, code: "email" };
  }

  if (motDePasse.length < 6 || motDePasse.length > 72) {
    return { ok: false, code: "longueur" };
  }

  // mots interdits en fonction de la liste NordPass 2025.
  const motsInterdits = [
    "pass@123",
    "pass@1234",
    "pass@12345",
    "p@ssw0rd",
    "p@$$w0rd",
    "p@55w0rd",
    "password@1",
    "password@123",
    "aa@12345",
    "aa@123456",
    "aa@1234567",
    "aa@123456789",
    "admin@123",
    "admin@1234",
    "abcd@123",
    "abcd@1234",
    "abcd1234@",
    "abc@123",
    "abc@1234",
    "abc@12345",
    "demo@123",
    "test@123",
    "welcome@123",
    "qwerty@123",
    "india@123",
    "kumar@123",
    "global123@",
    "gmail.12345",
    "123456aa@",
  ];

  if (motsInterdits.includes(motDePasse.toLowerCase())) {
    return { ok: false, code: "interdit" };
  }

  const caracteresAutorises = /^[a-zA-Z0-9!@#$%^&*_+=?.-]+$/;
  const reglesOk =
    /[a-z]/.test(motDePasse) &&
    /[A-Z]/.test(motDePasse) &&
    /[0-9]/.test(motDePasse) &&
    /[!@#$%^&*_+=?.-]/.test(motDePasse);

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
      nom: nomPseudo,
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
