import { redirect } from "next/navigation";
import { lireSession } from "@/lib/auth";

export async function getCurrentUserId(): Promise<number> {
  const utilisateur = await lireSession();
  if (!utilisateur) {
    redirect("/connexion");
  }
  return utilisateur.id;
}
