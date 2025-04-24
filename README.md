# M2 Application de notifications pour les parents d'eleves

Ce projet est une application [décris rapidement ici, ex: web de gestion, plateforme e-commerce, etc.].

## Prérequis

- Node.js (version recommandée : >= 18)
- npm ou yarn
- Git
- Prisma CLI (`npx prisma`)
- Un accès à une base de données (PostgreSQL, MySQL, etc.)

## Étapes d'installation

### 1. Utiliser l'invite de commande (CMD)

Assurez-vous d'exécuter toutes les commandes ci-dessous dans **CMD** (et non PowerShell).

### 2. Cloner le projet

```cmd
git clone https://github.com/ton-utilisateur/ton-projet.git
cd ton-projet
```

3. Installer les dépendances

```cmd
   npm install
```

4. Configurer la base de données avec Prisma
   Créez un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example` :

```cmd
copy .env.example .env
```

Modifiez la variable DATABASE_URL avec l'URL de votre base de données.

Ensuite, initialisez Prisma :

```cmd
npx prisma generate
npx prisma migrate dev --name init
```

5. Lancer le serveur
   ```cmd
   npm run dev
   ```
6. Mettre à jour le projet avec les dernières modifications
   ```cmd
   git pull
   ```
7. Visualiser la base de données avec Prisma Studio

   ```cmd
   npx prisma studio
   ```

   Cela ouvrira une interface web pour naviguer facilement dans votre base de données.

### Scripts utiles

**npm run dev**: Lancer le serveur de développement
**npx prisma migrate dev**: Appliquer les migrations Prisma
**npx prisma studio**: Ouvrir Prisma Studio
**git pull**: Récupérer les dernières modifications
