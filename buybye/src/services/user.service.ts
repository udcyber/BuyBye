import { prisma } from "@/lib/prisma";

// ⚠️ Temporaire : on utilise le compte de démo créé par le seed.
// Plus tard : lire l'utilisateur connecté depuis la session (Auth.js).
const EMAIL_DEMO = "demo@buybye.local";

export async function getCurrentUserId(): Promise<number> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: EMAIL_DEMO },
    select: { id: true },
  });
  return user.id;
}