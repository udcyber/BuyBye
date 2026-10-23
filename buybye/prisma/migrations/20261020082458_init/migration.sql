-- CreateTable
CREATE TABLE "utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasseHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorie" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "famille" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "categorieId" INTEGER NOT NULL,

    CONSTRAINT "famille_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_produit" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "type_produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produit" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prix" DECIMAL(10,2) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "familleId" INTEGER NOT NULL,
    "typeProduitId" INTEGER,

    CONSTRAINT "produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liste_achat" (
    "id" SERIAL NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prixUnitaire" DECIMAL(10,2) NOT NULL,
    "dateAchat" DATE NOT NULL,
    "userId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "liste_achat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liste_envie" (
    "id" SERIAL NOT NULL,
    "dateAjout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "liste_envie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_email_key" ON "utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categorie_code_key" ON "categorie"("code");

-- CreateIndex
CREATE UNIQUE INDEX "famille_categorieId_nom_key" ON "famille"("categorieId", "nom");

-- CreateIndex
CREATE UNIQUE INDEX "type_produit_userId_nom_key" ON "type_produit"("userId", "nom");

-- CreateIndex
CREATE INDEX "produit_userId_deletedAt_idx" ON "produit"("userId", "deletedAt");

-- CreateIndex
CREATE INDEX "liste_achat_userId_dateAchat_idx" ON "liste_achat"("userId", "dateAchat");

-- CreateIndex
CREATE INDEX "liste_envie_userId_idx" ON "liste_envie"("userId");

-- AddForeignKey
ALTER TABLE "famille" ADD CONSTRAINT "famille_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_produit" ADD CONSTRAINT "type_produit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produit" ADD CONSTRAINT "produit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produit" ADD CONSTRAINT "produit_familleId_fkey" FOREIGN KEY ("familleId") REFERENCES "famille"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produit" ADD CONSTRAINT "produit_typeProduitId_fkey" FOREIGN KEY ("typeProduitId") REFERENCES "type_produit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liste_achat" ADD CONSTRAINT "liste_achat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liste_achat" ADD CONSTRAINT "liste_achat_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liste_envie" ADD CONSTRAINT "liste_envie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liste_envie" ADD CONSTRAINT "liste_envie_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
