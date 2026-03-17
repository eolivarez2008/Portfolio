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
- **CI/CD** : Déploiement via Git & Docker Compose

**Accès au site :** [https://eolivarez.site](https://eolivarez.site)  

---

## Stack Technique

Le projet s’appuie sur un environnement **full-stack React moderne**, orienté performance, typage strict et déploiement optimisé Edge.

- **Framework React full-stack** : [Next.js 15+](https://nextjs.org/) — App Router, Server Components, routing basé sur le système de fichiers, optimisation automatique des performances (SSR / SSG / ISR).
- **Langage** : [TypeScript](https://www.typescriptlang.org/) — Typage statique avancé, sécurité à la compilation, meilleure maintenabilité du code.
- **Styling utility-first** : [Tailwind CSS](https://tailwindcss.com/) — Design system cohérent, classes utilitaires, responsive natif et optimisation du bundle.
- **Animations & micro-interactions** : [Framer Motion](https://www.framer.com/motion/) — Animations déclaratives, transitions fluides, layout animations et orchestration avancée.
- **Icônes SVG optimisées** : [Lucide React](https://lucide.dev/) — Bibliothèque d’icônes minimaliste, tree-shaking compatible.
- **Web analytics** : [Umami](https://umami.is/) — Solution open-source d’analyse d’audience, légère et respectueuse de la vie privée, auto-hébergée.
- **Hébergement & Infra** : [Docker](https://www.docker.com/) — Containerisation du site statique avec un serveur Nginx optimisé, auto-hébergé sur une VM dédiée.
- **Réseau & Sécurité** : [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/) — Exposition sécurisée du service sans ouverture de ports (Zero Trust), protection contre les attaques et gestion automatique du certificat SSL.
- **Protection Formulaire** : [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) — Alternative respectueuse de la vie privée à reCAPTCHA, avec une intégration invisible pour l'utilisateur.
- **Monitoring de Contact** : [Webhook Discord](https://support.discord.com/hc/fr/articles/228383668-Introduction-aux-Webhooks) — Système de notification instantané avec logs de transmission formatés (Style Console).

---

## Installation et Configuration

1. Clonage du projet

```bash
git clone https://github.com/eolivarez2008/Portfolio.git
cd Portfolio
```

2. Installation des dépendances

```bash
npm install
```

3. Configuration des variables d'environnement

Création du fichier .env à la racine du projet

```bash
# Cloudflare Turnstile (Captcha)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=votre_cle_publique
TURNSTILE_SECRET_KEY=votre_cle_secrete

# Notifications Discord
DISCORD_CONTACT_WEBHOOK_URL=votre_webhook_url
DISCORD_ADMIN_WEBHOOK_URL=votre_wekhook_url_2

# Monitoring du serveur avec Uptime Kuma
UPTIME_KUMA_URL=votre_uptime_kuma_url
NEXT_PUBLIC_UPTIME_KUMA_PUBLIC_URL=votre_page_de_statut

# ID Umami pour le suivi des visiteurs
NEXT_PUBLIC_UMAMI_WEBSITE_ID=votre_id_umami
```

4. Lancer le serveur de développement

```bash
npm run dev
```

Le projet sera accessible sur http://localhost:3000

---

## Auteur

Développé par **Emilien Olivarez** – Étudiant en Bac Pro CIEL (ex-SN)
Lycée Louis de Cormontaigne, Metz

---

## Licence

Ce projet est sous licence **MIT**.
Vous pouvez :

- utiliser librement les fichiers,
- les modifier,
- les redistribuer,
- y compris pour un usage commercial,

à condition de respecter les termes de la licence MIT :
https://opensource.org/licenses/MIT
