import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { createHmac } from "crypto";

function signature(valeur: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET manquant");
  }
  return createHmac("sha256", secret).update(valeur).digest("hex");
}

export async function ouvrirSession(id: number) {
  const session = await cookies();
  const fin = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const valeur = `${id}.${fin}`;

  session.set("session", `${valeur}.${signature(valeur)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function lireSession() {
  const session = await cookies();
  const cookieValue = session.get("session")?.value;

  if (cookieValue === undefined) {
    return null;
  }

  const cookieSplit = cookieValue.split(".");
  if (cookieSplit.length !== 3) {
    return null;
  }

  const id = Number(cookieSplit[0]);
  const fin = Number(cookieSplit[1]);
  const signatureCookie = cookieSplit[2];

  if (signatureCookie !== signature(`${id}.${fin}`)) {
    return null;
  }

  if (Date.now() > fin) {
    return null;
  }

  const compte = await prisma.user.findUnique({
    where: { id },
  });

  if (compte === null) {
    return null;
  }

  return {
    id: compte.id,
    nom: compte.nom,
    email: compte.email,
  };
}
