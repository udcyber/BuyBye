## Stratégie Git

### Branches

| Branche | Rôle |
|---|---|
| `main` | Version finale du projet. Aucun commit direct. |
| `dev` | Version globale en cours de développement et destinée aux merges. |
| `feat(scope)/*` | Développement d'une fonctionnalité. |
| `fix(scope)/*` | Correction d'un bug. |
| `docs(position du fichier)/*` | Modification de documentation. |
| `style(scope)/*` | Modifications liées à la syntaxe et à la lisibilité. |
| `test(scope)/*` | Ajout ou correction d'un test. |

### Flux

1. Partir de `dev`.
2. Créer une branche `feat(scope)/*`, `fix(scope)/*` ou `docs(position du fichier)/*`.
3. Commiter sur cette branche.
4. Ouvrir une Pull Request vers `dev`.
5. Faire relire par l'autre membre de l'équipe lorsque c'est possible.
6. Merger dans `dev` seulement après vérification.
7. Mettre à jour `main` depuis `dev` lorsqu'une version est stable.

### Commits

Convention inspirée de Conventional Commits. Messages en anglais, une évolution par commit.

| Préfixe | Usage | Exemple |
|---|---|---|
| `feat` | Nouvelle fonctionnalité | `feat: add product creation` |
| `fix` | Correction | `fix: correct purchase calculation` |
| `test` | Tests | `test: add product service tests` |
| `docs` | Documentation | `docs: update API specification` |

### Pull Request

La Pull Request indique :

- la fonctionnalité ou le problème traité ;
- les modifications effectuées ;
- les dépendances ou conséquences ;
- les vérifications réalisées.

La relecture porte sur la conformité avec l'architecture convenue, la lisibilité, les conventions du projet, les erreurs, la sécurité, les effets de bord et les tests lorsque c'est nécessaire.
