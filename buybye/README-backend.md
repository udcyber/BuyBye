# Architecture backend BuyBye

Le backend est dans le projet Next.js. Il n'y a pas de second serveur.

## Dossiers

`src/actions/` modifie les données. Une action crée, change ou supprime : un compte, un produit, un achat, une envie. Le formulaire de la page l'appelle.

`src/services/` lit la base. Une page demande la liste des produits, le catalogue ou les chiffres du dashboard. Le service ne modifie rien.

`src/lib/` garde les outils communs. `prisma.ts` parlera à PostgreSQL. `auth.ts` gérera la session. `validations.ts` contrôlera les formulaires.

`src/types/` décrit la forme des données échangées, par exemple un produit.

`src/app/api/` n'est pas le backend général. Il est réservé à l'authentification, plus une petite route de test.

## Règle

Une page affiche. Une action modifie. Un service lit. Prisma écrit dans PostgreSQL.
