# Lancer BuyBye avec Docker

Les commandes se lancent dans le dossier `buybye/`, à côté de `package.json`.

Une fois :

```bash
cp .env.example .env
```

`.env` ne se commit pas.

## Dans Ubuntu :
Les volumes restent dans `docker-compose.yml`.
Un fichier modifié est vu par le site, la mise à jour est automatique.

```bash
docker compose up --build
```

## Dans PowerShell
La mise à jour n'est pas automatique.  
Avant de lancer, enlever ces lignes sous `app` :

```yaml
    volumes:
      - .:/app
      - /app/node_modules
```

Puis :

```powershell
docker compose up
```

Sans ces lignes, un fichier modifié n'est pas vu tout de suite.
Relancer `docker compose up --build` pour le prendre en compte.

Le site est sur http://localhost:3000.
Laisser le terminal ouvert.

Arrêter : Ctrl+C, puis

```bash
docker compose down
```
