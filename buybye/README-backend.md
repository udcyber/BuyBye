# Architecture backend BuyBye

Le backend est dans le projet Next.js. Il n'y a pas de second serveur.

## Dossiers

`src/actions/` modifie les données. Une action crée, change ou supprime : un compte, un produit, un achat, une envie. Le formulaire de la page l'appelle.

`src/services/` lit la base. Une page demande la liste des produits, le catalogue ou les chiffres du dashboard. Le service ne modifie rien.

`src/lib/` garde les outils communs. `prisma.ts` parlera à PostgreSQL. `auth.ts` gérera la session. `validations.ts` contrôlera les formulaires.

`src/types/` décrit la forme des données échangées, par exemple un produit.

`src/app/api/` n'est pas le backend général. Il est réservé à l'authentification, plus une petite route de test.

## Endpoints

Les modifications passent par des Server Actions, pas par des URLs.

`auth.actions.ts` : inscription, connexion, déconnexion.
`produit.actions.ts` : créer, modifier, supprimer un produit.
`achat.actions.ts` : ajouter, modifier, retirer un achat.
`envie.actions.ts` : ajouter, retirer une envie.

Les lectures passent par des services, appelés par les pages.

`produit.service.ts` : liste et détail des produits.
`catalogue.service.ts` : catalogue.
`stats.service.ts` : chiffres du dashboard.
`reference.service.ts` : familles, catégories, types.

Une seule route HTTP est prévue : `src/app/api/auth/[...nextauth]/route.ts`, pour la session. Pas de route produit, achat ou envie.

## Règle

Une page affiche. Une action modifie. Un service lit. Prisma écrit dans PostgreSQL.
