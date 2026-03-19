# PORTFOLIO – Site web personnel

Bienvenue sur le dépôt de mon **portfolio personnel**.
Ce projet est bien plus qu'un simple CV en ligne : ce site est le hub central de mes réalisations en développement, infrastructure et cybersécurité.

Le site propose une expérience immersive basée sur une esthétique "High-Tech" et minimaliste, structurée autour de plusieurs modules clés :

- **Accueil** : Interface fluide
- **Projets** : Galerie asymétrique exposant mes réalisations
- **Parcours** : Une timeline interactive retraçant mon parcours scolaire et professionnel.
- **A propos** : Présentation technique avec un système de "Infinite Marquee" pour les stacks technologiques.
- **Contact** : Hub de communication permettant une prise de contact directe.

---

## Déploiement & Architecture

Le projet est entièrement containerisé et repose sur une architecture micro-services gérée par **Docker Compose**.

- **Infrastructure** : Docker & Docker Compose
- **Serveur Web** : Nginx (Alpine)
- **Tunneling & Sécurité** : Cloudflare Tunnel (Zero Trust)
- **Base de données** : SQLite via Prisma ORM
- **CI/CD** : Déploiement via Git & Docker Compose

**Accès au site :** [https://eolivarez.site](https://eolivarez.site)  

---

## Stack Technique

Le projet s’appuie sur un environnement **full-stack React moderne**, orienté performance, typage strict et déploiement optimisé Edge.

- **Framework** : [Next.js 16](https://nextjs.org/) — App Router, Server Components, API Routes
- **Langage** : [TypeScript](https://www.typescriptlang.org/) — Typage strict, interfaces centralisées dans `src/types/`
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) — Design system cohérent, responsive natif
- **Animations** : [Framer Motion](https://www.framer.com/motion/) — Transitions fluides, layout animations
- **Icônes** : [Lucide React](https://lucide.dev/) — SVG optimisés, tree-shaking compatible
- **Base de données** : [Prisma ORM](https://www.prisma.io/) + SQLite — Schéma typé, migrations versionnées, audit log
- **Analytics** : [Umami](https://umami.is/) — Auto-hébergé, sans cookie, RGPD compliant
- **Hébergement** : [Docker](https://www.docker.com/) — Containerisation, auto-hébergé sur VM Debian dédiée
- **Réseau** : [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) — Zero Trust, SSL automatique, protection DDoS
- **Formulaire** : [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) — Anti-bot sans friction
- **Notifications** : [Discord Webhooks](https://discord.com/developers/docs/resources/webhook) — Alertes contact et modifications admin en temps réel
- **Monitoring** : [Uptime Kuma](https://uptime.kuma.pet/) — Surveillance des services auto-hébergés

---

## Installation et Configuration

### 1 — Cloner le projet

```bash
git clone https://github.com/eolivarez2008/Portfolio.git
cd Portfolio
```

### 2 — Installer les dépendances

```bash
npm install
```

### 3 — Configurer les variables d'environnement

```bash
# Copier le fichier et remplacer les variables par les siennes
cp .env.example .env
```

### 4 — Initialiser la base de données

```bash
# Créer les tables
npx prisma migrate dev --name init

# Importer les données initiales
npm run db:seed
```

### 5 — Lancer en développement

```bash
npm run dev
```

Le projet sera accessible sur `http://localhost:3000`

## Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # Vérification ESLint
npm run db:migrate   # Créer une migration Prisma
npm run db:seed      # Importer les données initiales
npm run db:studio    # Interface visuelle de la base de données
npm run db:generate  # Régénérer le client Prisma
```

---

## Déploiement Docker

```bash
# Build et démarrage
docker compose build --no-cache
docker compose up -d

# Logs
docker logs portfolio --tail 50

# Arrêt
docker compose down
```

Les données persistantes sont stockées dans :

- `./uploads/` — fichiers PDF uploadés via l'admin
- `./prisma/database.db` — base de données SQLite

---

## Panel Admin

Accessible sur `/admin`. Protégé par `ADMIN_SECRET`.

Permet de modifier sans redéploiement :

- **About** — tech stack et roadmap
- **Parcours** — entrées timeline et archives de bulletins
- **Site** — hero, citations, expertise grid et biographie
- **Legal** — mentions légales, RGPD et politique cookies
- **Status** — mapping des services Uptime Kuma
- **GitHub** — purge manuelle du cache des dépôts

---

## Auteur

Développé par **Emilien Olivarez** – Étudiant en Bac Pro CIEL (ex-SN)
Lycée Louis de Cormontaigne, Metz

---

## Licence

Vous pouvez :
Ce projet est sous licence **MIT**.

- utiliser librement les fichiers,
- les modifier,
- les redistribuer,
- y compris pour un usage commercial,

à condition de respecter les termes de la licence MIT :
https://opensource.org/licenses/MIT
