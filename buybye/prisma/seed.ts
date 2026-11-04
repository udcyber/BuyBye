import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

// Catégories = les 13 divisions de la COICOP 2018 (INSEE)
// ✔ = intitulé vérifié sur insee.fr (ECOICOP v2) ; ⚠ = à vérifier
const categories = [
  { code: "01", nom: "Produits alimentaires et boissons non alcoolisées" }, // ✔
  { code: "02", nom: "Boissons alcoolisées, tabac et stupéfiants" }, // ⚠
  { code: "03", nom: "Articles d’habillement et chaussures" }, // ✔
  { code: "04", nom: "Logement, eau, gaz, électricité et autres combustibles" }, // ✔
  { code: "05", nom: "Meubles, articles de ménage et entretien courant du foyer" }, // ✔
  { code: "06", nom: "Santé" }, // ⚠
  { code: "07", nom: "Transports" }, // ⚠
  { code: "08", nom: "Information et communication" }, // ✔
  { code: "09", nom: "Loisirs, sport et culture" }, // ✔
  { code: "10", nom: "Services d'enseignement" }, // ⚠
  { code: "11", nom: "Services de restauration et d'hébergement" }, // ✔
  { code: "12", nom: "Assurance et services financiers" }, // ✔
  { code: "13", nom: "Soins corporels, protection sociale et biens et services divers" }, // ✔
];

// Familles : sous-ensemble pour le MVP (groupes INSEE), à compléter
const familles = [
  { categorieCode: "01", nom: "Produits alimentaires" }, // 01.1 ✔
  { categorieCode: "01", nom: "Boissons non alcoolisées" }, // 01.2 ✔
  { categorieCode: "02", nom: "Boissons alcoolisées" }, // 02.1 ⚠
  { categorieCode: "05", nom: "Entretien courant de la maison" }, // ⚠
  { categorieCode: "11", nom: "Services de restauration et de débits de boissons" }, // 11.1 ✔
  { categorieCode: "13", nom: "Soins personnels" }, // 13.1 ⚠
];


async function seedReference() {
  for (const { code, nom } of categories) {
    await prisma.categorie.upsert({
      where: { code },
      update: { nom },
      create: { code, nom },
    });
  }

  for (const { categorieCode, nom } of familles) {
    const categorie = await prisma.categorie.findUniqueOrThrow({
      where: { code: categorieCode },
    });
    await prisma.famille.upsert({
      where: { categorieId_nom: { categorieId: categorie.id, nom } },
      update: {},
      create: { nom, categorieId: categorie.id },
    });
  }
}

const EMAIL_DEMO = "@buybye.demo";

async function seedDemo() {
  const existant = await prisma.user.findUnique({ where: { email: EMAIL_DEMO } });
  if (existant) {
    console.log("Données de démo déjà présentes : rien à faire.");
    return;
  }

  // Compte de démonstration (développement uniquement)
  const user = await prisma.user.create({
    data: {
      nom: "Demo",
      email: EMAIL_DEMO,
      motDePasseHash: await argon2.hash("Demo1234!", { type: argon2.argon2id }),
    },
  });

  // Types personnels de l'utilisateur
  const typeIds: Record<string, number> = {};
  for (const nom of ["Aliment frais", "Aliment sec", "Boisson", "Soin", "Ménage"]) {
    const type = await prisma.typeProduit.create({ data: { nom, userId: user.id } });
    typeIds[nom] = type.id;
  }

  // Catalogue
  const catalogue = [
    { nom: "Lait demi-écrémé 1 L", prix: 1.15, famille: "Produits alimentaires", type: "Boisson" },
    { nom: "Pain de campagne", prix: 2.2, famille: "Produits alimentaires", type: "Aliment frais" },
    { nom: "Pâtes complètes 500 g", prix: 1.6, famille: "Produits alimentaires", type: "Aliment sec" },
    { nom: "Gel douche", prix: 3.5, famille: "Soins personnels", type: "Soin" },
    { nom: "Liquide vaisselle", prix: 2.1, famille: "Entretien courant de la maison", type: "Ménage" },
    { nom: "Café moulu 250 g", prix: 4.9, famille: "Boissons non alcoolisées", type: "Boisson" },
    { nom: "Pommes bio 1 kg", prix: 3.2, famille: "Produits alimentaires", type: "Aliment frais" },
    { nom: "Dentifrice", prix: 2.8, famille: "Soins personnels", type: "Soin" },
  ];

  const produits: Record<string, { id: number; prix: number }> = {};
  for (const p of catalogue) {
    const famille = await prisma.famille.findFirstOrThrow({ where: { nom: p.famille } });
    const produit = await prisma.produit.create({
      data: {
        nom: p.nom,
        prix: p.prix,
        userId: user.id,
        familleId: famille.id,
        typeProduitId: typeIds[p.type],
      },
    });
    produits[p.nom] = { id: produit.id, prix: p.prix };
  }

  // Historique d'achat (le prix unitaire est copié au moment de l'achat)
  const achats = [
    { produit: "Lait demi-écrémé 1 L", quantite: 6, date: "2026-10-03" },
    { produit: "Café moulu 250 g", quantite: 1, date: "2026-10-03" },
    { produit: "Pommes bio 1 kg", quantite: 2, date: "2026-09-28" },
    { produit: "Gel douche", quantite: 1, date: "2026-09-21" },
    { produit: "Pâtes complètes 500 g", quantite: 4, date: "2026-09-14" },
    { produit: "Pain de campagne", quantite: 2, date: "2026-09-12" },
  ];
  await prisma.achat.createMany({
    data: achats.map((a) => ({
      userId: user.id,
      produitId: produits[a.produit].id,
      quantite: a.quantite,
      prixUnitaire: produits[a.produit].prix,
      dateAchat: new Date(a.date),
    })),
  });

  // Liste d'envies
  const envies = [
    { produit: "Liquide vaisselle", date: "2026-10-01" },
    { produit: "Dentifrice", date: "2026-09-25" },
    { produit: "Café moulu 250 g", date: "2026-09-18" },
  ];
  await prisma.envie.createMany({
    data: envies.map((e) => ({
      userId: user.id,
      produitId: produits[e.produit].id,
      dateAjout: new Date(e.date),
    })),
  });
}

async function main() {
  await seedReference();
  await seedDemo();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });