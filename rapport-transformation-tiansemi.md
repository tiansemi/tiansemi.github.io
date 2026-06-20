# Rapport de Transformation Digitale — TianSemi & Portfolio M. MOULO OHOLO JEAN NOËL

**Audit, stratégie et roadmap pour transformer `tiansemi.github.io` en plateforme 4-en-1**
*(Portfolio professionnel · Site vitrine du club · Plateforme d'apprentissage · Blog technique Réseau & Cybersécurité)*

Périmètre audité : dépôt `tiansemi.github.io` fourni (site.zip), comparé au site en production (vérifié en direct le 20/06/2026).

---

## 0. Résumé exécutif

Le projet actuel est un **template de portfolio développeur générique** (« developer-portfolio » de codewithsadee, single-page) auquel ont été ajoutés deux modules fonctionnels réels et bien construits : un **quiz interactif** et un **outil de révision TOEIC par flashcards**, plus une **authentification Google via Firebase**. C'est une base technique saine (HTML sémantique correct, JS vanilla propre, système i18n FR/EN fait main de bonne qualité) mais qui **n'a pas encore été adaptée au fond** : adresse, téléphone, e-mails, statistiques (« 230+ projets », « 95+ clients »), images de projets et mention de copyright sont **toujours ceux du template d'origine**, et **aucun contenu du club TianSemi n'existe** (pas de page Club, pas de membres, pas de blog, pas d'apprentissage structuré). Le site se présente comme une page personnelle isolée, alors que l'ambition est d'en faire la vitrine commune d'un club académique, un outil de recrutement et un centre de ressources pédagogiques.

**Trois constats structurent toute la suite de ce rapport :**

1. **Crédibilité immédiate compromise.** Adresse fictive, mention « © 2022 codewithsadee », formulaire de contact qui n'envoie nulle part : ce sont des correctifs à très faible effort et très fort impact, à traiter avant tout le reste (Sprint 0).
2. **Architecture mono-page incompatible avec l'ambition 4-en-1.** Une seule page avec ancres ne peut pas porter un blog, un catalogue de formations et une page club sans devenir illisible. Il faut faire évoluer la structure vers un site multi-pages avec une arborescence claire, tout en conservant la compatibilité GitHub Pages (statique, sans serveur).
3. **Fondations techniques correctes mais incomplètes.** Pas de `robots.txt`, pas de `sitemap.xml`, pas de métadonnées SEO/Open Graph, pas de CI/CD, pas de page 404, un fichier `page01.html` orphelin dupliqué dans le dépôt public. Rien de cela n'est grave isolément, mais l'accumulation freine le référencement, la maintenabilité et la confiance des visiteurs professionnels (recruteurs, partenaires académiques).

La bonne nouvelle : le socle technique (pas de framework lourd, pas de dette d'outillage complexe, code lisible) rend la transformation **réalisable en 8 sprints courts**, sans rien casser de l'existant fonctionnel (quiz, TOEIC, auth).

---

## 1. Audit complet de l'existant

### 1.1 Architecture du dépôt

```
tiansemi.github.io/
├── index.html              # page d'accueil (single page, sections ancrées)
├── page01.html             # ⚠️ version antérieure orpheline, non liée, dupliquée (924 vs 919 lignes)
├── quiz.html                # quiz interactif (fonctionnel)
├── toeic.html                # flashcards TOEIC (fonctionnel, styles inline propres)
├── assets/
│   ├── css/style.css (1605 lignes) + quiz.css (319 lignes)
│   ├── js/script.js (314) + quiz.js (458) + firebase.js (243)
│   └── images/ (33 fichiers PNG, icônes techno + bannières)
├── pages/quiz/ (questions JSON + ~100 images d'illustration de quiz)
├── package.json (1 seule dépendance : firebase)
├── README.md
└── .git/ (14 commits, historique court mais propre)
```

**Constat :** site statique pur, sans build, sans framework — donc nativement compatible GitHub Pages. Aucun dossier `.github/workflows`, aucun `robots.txt`, `sitemap.xml`, `404.html`, `LICENSE` ni `CONTRIBUTING.md`.

### 1.2 Qualité du code

| Élément | Constat | Évaluation |
|---|---|---|
| HTML | Sémantique correcte (`header`, `main`, `section`, `footer`, `address`, `time`), `alt` descriptifs sur la quasi-totalité des images | ✅ Bon |
| CSS | Un seul fichier monolithique de 1605 lignes, pas de méthodologie visible (BEM partiel), pas de variables CSS centralisées détectées pour `index.html`, `toeic.html` redéfinit son propre jeu de tokens en `<style>` inline (`--bg`, `--primary`…) | ⚠️ À structurer |
| JavaScript | Vanilla JS propre, `"use strict"`, fonctions nommées, système i18n fait main avec `data-i18n` qui utilise `textContent` (pas d'injection HTML dangereuse), met à jour dynamiquement `document.documentElement.lang` | ✅ Bon, mieux que la moyenne d'un template gratuit |
| `firebase.js` | Fonctionnel, gestion d'erreurs détaillée par code Firebase | ⚠️ Voir §1.6 sécurité |
| Duplication | `page01.html` = ancienne version de `index.html` (diff de 110 lignes), toujours présente et accessible publiquement à `/page01.html`, non référencée dans la navigation | ❌ Dette technique |
| Outillage | Pas de linter (`.eslintrc`), pas de formatter, pas de tests, pas de script `npm run build/lint` dans `package.json` | ❌ Absent |

### 1.3 Performance

- Pas de minification CSS/JS, pas de bundling — acceptable à ce volume (≈ 6 600 lignes) mais ne passera pas l'échelle une fois blog + apprentissage ajoutés.
- Hero banner utilise déjà `<picture>` + `srcset` responsive — **bonne pratique à généraliser**.
- 33 icônes techno chargées en PNG individuels sans `width`/`height` explicites ni `loading="lazy"` repérés sur les images sous la ligne de flottaison → risque de **Cumulative Layout Shift (CLS)** et de requêtes inutiles au chargement initial.
- Dépendances tierces via CDN sans intégrité (`unpkg.com/ionicons`, `gstatic.com/firebasejs`) : pas de `integrity`/`crossorigin` SRI.
- Polices Google Fonts avec `preconnect` + `display=swap` déjà en place — ✅ bon réflexe.

### 1.4 SEO

| Élément attendu | Présent ? |
|---|---|
| `<meta name="description">` | ❌ Absent sur toutes les pages |
| Open Graph / Twitter Cards | ❌ Absent |
| `<link rel="canonical">` | ❌ Absent |
| `robots.txt` | ❌ Absent |
| `sitemap.xml` | ❌ Absent |
| Données structurées Schema.org (Person, Organization) | ❌ Absent |
| `hreflang` (site bilingue FR/EN) | ❌ Absent — le switch de langue est 100 % côté client (JS), donc **Google n'indexe que la langue affichée par défaut** ; le contenu FR n'est jamais crawlable séparément |
| Hiérarchie de titres | Cohérente dans l'ensemble (un seul `h1`, `h2` par section) mais `lang="en"` sur `index.html` alors que de larges portions de contenu cible sont en français | ⚠️ |
| URLs propres | Site mono-page : la majorité du contenu vit derrière des ancres (`#about`, `#skills`) non indexables comme pages distinctes | ⚠️ Limite structurelle |

### 1.5 Accessibilité

- Points positifs : labels de formulaire correctement associés (`for`/`id`), boutons icône avec `aria-label` (thème, menu mobile), structure de landmarks correcte.
- Points à corriger : les liens sociaux (icônes seules) n'exposent un libellé que via une `div.tooltip` visuelle au survol, **non garantie d'être restituée par un lecteur d'écran** → ajouter `aria-label` directement sur le lien.
- `aria-expanded` absent sur le bouton de menu mobile (`data-nav-toggle-btn`) alors que son état change.
- Contraste des couleurs non vérifié visuellement dans cet audit (nécessite un passage Lighthouse/axe avant mise en production) → action de vérification à planifier.
- Sélecteur de langue (`<select id="lang">`) sans `<label>` visible ni `aria-label`.

### 1.6 Sécurité

- La clé `apiKey` Firebase est visible dans `firebase.js` : **ce n'est pas en soi une faille** (les clés Firebase web sont publiques par conception), mais la vraie protection — restriction des domaines autorisés dans la console Firebase Auth, règles Firestore/Storage strictes — **n'est pas vérifiable depuis le dépôt** et doit être confirmée côté console.
- `firebase.js` **désactive sélectivement `console.warn`** pour masquer les avertissements `Cross-Origin-Opener-Policy` liés au popup Google. C'est une rustine qui **cache un signal légitime du navigateur** plutôt que de corriger la cause (ex. utiliser `signInWithRedirect` ou les en-têtes COOP adaptés) — à corriger.
- Aucune attribution **SRI** (`integrity=`) sur les scripts tiers chargés via CDN (`ionicons`, `firebase`) : en cas de compromission du CDN, du code arbitraire pourrait s'exécuter sur le site.
- Aucun en-tête de sécurité applicatif (CSP, X-Content-Type-Options) — limité par défaut sur GitHub Pages (pas de configuration serveur), mais une **CSP via balise `<meta>`** reste possible et recommandée.
- Le formulaire de contact a `action=""` : il ne transmet les données nulle part — pas une faille, mais un **point mort fonctionnel** trompeur pour l'utilisateur.
- Bon point : pas de secret serveur, pas de base de données interrogée directement depuis le front, HTTPS forcé par défaut sur GitHub Pages.

### 1.7 Responsive / Mobile

- Mobile-first partiellement respecté : media queries présentes, menu burger fonctionnel, image hero adaptative. Les sections ajoutées (TOEIC, Quiz) ont leur propre feuille de style cohérente. Pas d'anomalie bloquante détectée dans le code ; un test visuel multi-device reste à faire avant lancement.

### 1.8 UX/UI

- Ton et contenu **encore très « template générique »** : « Need a Creative Product? I can Help You! », « 95+ Happy Clients », adresse `941 Saqrqorish Road, alandalos, grnata, wa 47122-4194` (chaîne factice issue du générateur de template), `info@oholo.com`, liens sociaux tous en `#`. Cela nuit directement à la crédibilité du portfolio et du club auprès de recruteurs et partenaires.
- La galerie de projets mélange 2 réalisations réelles (Quiz, TOEIC) et 5 cartes factices à images stock sans rapport avec le club ou la cybersécurité (« Travel Workflow », « Product Landing »…).
- Footer : `© 2022 codewithsadee` — attribution incorrecte, à corriger en priorité absolue (image de marque).
- Authentification Google présente en en-tête sans bénéfice fonctionnel visible pour le visiteur (aucun contenu protégé n'apparaît après connexion à part un message de bienvenue) → soit lui donner un vrai rôle (suivi de progression quiz/TOEIC, espace membre), soit la retirer de la version publique tant qu'elle n'a pas d'usage clair.

### 1.9 Compatibilité GitHub Pages

Le site est 100 % statique, donc nativement compatible. Toute évolution proposée dans ce rapport (multi-pages, blog, CI/CD) **reste dans ce périmètre** : pas de backend requis, à l'exception du formulaire de contact qui nécessitera un service tiers gratuit compatible statique (Formspree, Getform, EmailJS — voir §9).

### 1.10 Synthèse SWOT et dette technique

| Forces | Faiblesses |
|---|---|
| Code propre, sémantique, sans dépendance lourde | Contenu encore 100 % générique/factice par endroits |
| Système i18n FR/EN fait main, robuste et sûr (`textContent`) | Architecture mono-page incompatible avec blog + apprentissage |
| Quiz et TOEIC fonctionnels et bien intégrés | Aucune page « Club TianSemi » n'existe |
| Compatible GitHub Pages sans configuration | SEO quasi inexistant (pas de meta, sitemap, robots) |
| Historique Git propre, projet jeune (peu de dette accumulée) | Pas de CI/CD, pas de tests, pas de lint |

| Risques | Opportunités |
|---|---|
| Image de marque écornée par les placeholders avant tout lancement public élargi | Base technique légère = transformation rapide, peu de réécriture |
| Fichier `page01.html` indexable et visible publiquement (contenu dupliqué) | Authentification Firebase déjà en place → fondation pour un futur espace membre |
| Dépendance à un seul mainteneur (M. Moulo) sans doc de contribution | Premier site du genre pour le club → opportunité de différenciation forte (créneau réseau/cybersécurité + INPHB) |

**Dette technique priorisée :** (1) contenu factice, (2) `page01.html` orphelin, (3) absence de SEO technique, (4) absence de CI/CD, (5) CSS non structuré en design system.

---

## 2. Analyse stratégique — publics & personas

| # | Persona | Objectif principal | Frustration actuelle sur le site | Parcours attendu |
|---|---|---|---|---|
| 1 | **Étudiant INPHB curieux** | Apprendre réseau/cybersécurité par la pratique | Aucune ressource pédagogique structurée, le Quiz est isolé sans contexte | Accueil → Apprentissage → Parcours « Réseaux débutant » → Quiz d'auto-évaluation |
| 2 | **Futur membre TianSemi** | Comprendre le club et rejoindre | Le mot « TianSemi » n'apparaît que dans le titre, sans page dédiée | Accueil → Club → Mission/Activités → CTA « Rejoindre » |
| 3 | **Recruteur / entreprise** | Évaluer rapidement les compétences de M. Moulo et la dynamique du club | Stats factices (« 95+ clients »), projets sans rapport, formulaire de contact non fonctionnel | Accueil → Portfolio → Projets réels → CV → Contact fiable |
| 4 | **Partenaire académique** | Vérifier le sérieux et la légitimité institutionnelle (INPHB) | Aucune mention d'ancrage académique, aucun partenaire listé | Accueil → Club → Partenaires/Évènements → Contact |
| 5 | **Professionnel réseau/cybersécurité** | Évaluer la qualité technique du contenu (jury, mentor) | Pas de blog technique, pas d'articles de veille | Apprentissage/Blog → Article technique → Profil auteur |
| 6 | **Visiteur du blog** | Trouver un tutoriel ou une actualité cybersécurité fiable | Le blog n'existe pas encore | Recherche Google → Article → Navigation vers ressources liées |
| 7 | **Membre actuel du club** | Trouver rapidement les ressources internes, contribuer | Pas d'espace dédié, pas de documentation de contribution | Accueil → Club → Membres/Ressources → (futur espace connecté) |

**Indicateurs de succès proposés :** taux de complétion du formulaire de contact, temps passé sur les pages Apprentissage/Blog, nombre de quiz complétés, nombre de demandes d'adhésion via le CTA Club, position SEO sur les requêtes « TianSemi », « club cybersécurité INPHB ».

---

## 3. Architecture cible (plateforme 4-en-1)

Passage d'un **site mono-page** à un **site multi-pages statique** organisé en quatre pôles, reliés par une page d'accueil commune qui sert de portail :

```
Accueil (portail commun)
 ├── A. PORTFOLIO — /portfolio/
 │     présentation Moulo, parcours, compétences, certifications, CV, contact
 ├── B. CLUB TIANSEMI — /club/
 │     histoire, mission/vision, membres, organisation, activités, évènements, partenaires
 ├── C. APPRENTISSAGE — /apprentissage/
 │     réseaux · cybersécurité · linux · programmation · cloud/devops · IA
 │     + outils existants : /apprentissage/quiz/ et /apprentissage/toeic/
 └── D. BLOG TECHNIQUE — /blog/
       tutoriels, veille cybersécurité, retours d'expérience, projets, actualités
```

**Principe directeur :** chaque pôle est navigable indépendamment (un recruteur ne voit que le Portfolio s'il le souhaite ; un étudiant peut aller droit à l'Apprentissage), mais des **liens croisés contextuels** relient les pôles (ex. un article de blog sur le sous-réseautage renvoie vers le parcours Apprentissage correspondant et vers le profil de l'auteur dans le Club).

---

## 4. Sitemap & arborescence détaillée

```
/                                   Accueil portail (sections teaser des 4 pôles)
/portfolio/
  /portfolio/index.html             Présentation, parcours, CV
  /portfolio/competences.html       Compétences détaillées
  /portfolio/certifications.html
  /portfolio/projets/               Réalisations réelles uniquement
  /portfolio/contact.html
/club/
  /club/index.html                  Histoire, mission, vision
  /club/membres.html                Organigramme, bureau
  /club/activites.html
  /club/evenements.html
  /club/partenaires.html
  /club/rejoindre.html              CTA adhésion + formulaire
/apprentissage/
  /apprentissage/index.html         Vue d'ensemble des parcours
  /apprentissage/reseaux/
  /apprentissage/cybersecurite/
  /apprentissage/linux/
  /apprentissage/programmation/
  /apprentissage/cloud-devops/
  /apprentissage/ia/
  /apprentissage/quiz/              (existant, déplacé/conservé)
  /apprentissage/toeic/             (existant, déplacé/conservé)
/blog/
  /blog/index.html                  Liste des articles, filtrage par catégorie
  /blog/<categorie>/
  /blog/<slug-article>.html
/contact/                           Point de contact unifié (club + portfolio)
/mentions-legales.html
/404.html
/robots.txt
/sitemap.xml
```

**Navigation principale recommandée :** `Accueil · Club · Apprentissage · Blog · Portfolio · Contact`, avec un sélecteur de langue persistant et le quiz/TOEIC accessibles depuis Apprentissage plutôt que depuis le menu racine (pour ne pas saturer la barre de navigation une fois le blog ajouté).

---

## 5. Wireframes textuels (pages clés)

**Accueil (portail) :**
```
[Header : logo TianSemi | Club · Apprentissage · Blog · Portfolio · Contact | Lang | Thème]
[Hero : accroche club + CTA "Découvrir le club" / CTA "Commencer à apprendre"]
[Bandeau stats réelles : membres actifs · ressources publiées · articles de blog]
[Section teaser CLUB  → carte avec lien "En savoir plus"]
[Section teaser APPRENTISSAGE → 3-4 parcours en vedette]
[Section teaser BLOG → 3 derniers articles]
[Section teaser PORTFOLIO → présentation courte de M. Moulo + lien CV]
[Footer : liens institutionnels, réseaux sociaux réels, mentions légales]
```

**Page Club (`/club/`) :**
```
[Hero club : nom, slogan, photo/illustration équipe]
[Mission / Vision — 2 colonnes]
[Chiffres clés réels : année de création, nombre de membres, projets menés]
[Organisation : bureau actuel avec rôles]
[Activités récentes — grille de cartes]
[Partenaires académiques/industriels — logos]
[CTA "Rejoindre TianSemi" → formulaire ou contact]
```

**Page article de Blog :**
```
[Fil d'Ariane : Blog > Catégorie > Titre]
[En-tête : titre, auteur (lien profil), date, temps de lecture, catégorie]
[Corps de l'article : Markdown rendu, blocs de code avec coloration syntaxique]
[Encadré "Pour aller plus loin" → lien vers parcours Apprentissage lié]
[Articles similaires]
```

---

## 6. Design system recommandé

**Identité visuelle :** ton technologique/cybersécurité crédible — bleu nuit/marine comme couleur de fond dominante (cohérent avec le thème sombre déjà présent), un accent cyan/teal (signal "réseau/sécurité"), un accent chaud unique pour les CTA afin de ne pas tout transformer en bleu indifférencié.

```css
:root {
  /* Neutres */
  --color-bg: #0e1420;
  --color-surface: #161e2e;
  --color-text: #eef1f6;
  --color-text-muted: #97a3b6;
  --color-border: #243049;

  /* Marque */
  --color-primary: #176b87;      /* déjà présent dans toeic.html → à harmoniser sur tout le site */
  --color-primary-dark: #104f66;
  --color-accent: #2fd1c8;       /* cyan "réseau/sécurité" */
  --color-cta: #d86f45;          /* accent chaud, réservé aux call-to-action */

  /* États */
  --color-success: #2f8f68;
  --color-warning: #d4a72c;
  --color-danger: #c4453f;

  /* Typo */
  --font-display: "Saira Stencil One", sans-serif; /* titres d'impact */
  --font-heading: "Poppins", sans-serif;
  --font-body: "Roboto", sans-serif;

  /* Échelle d'espacement (8px) */
  --space-1: 0.5rem; --space-2: 1rem; --space-3: 1.5rem;
  --space-4: 2rem;   --space-5: 3rem;  --space-6: 4.5rem;
}
```

**Action concrète :** extraire ce jeu de tokens dans `assets/css/tokens.css`, l'importer dans `style.css` **et** remplacer le bloc `<style>` inline de `toeic.html` par les mêmes variables — élimine la divergence actuelle entre les deux systèmes de couleurs.

**Composants à formaliser** (déjà partiellement présents, à documenter/réutiliser) : bouton primaire/secondaire, carte (stat / projet / article / parcours), badge de catégorie (Réseaux, Cybersécurité, Linux…), encart d'alerte/astuce (utile en blog technique), composant bloc de code avec bouton « copier », barre de progression de parcours, composant fiche membre (photo, rôle, lien LinkedIn/GitHub).

---

## 7. Stratégie de contenu

**Repositionnement du slogan d'accueil** (à valider avec le club) :

> *FR* — « TianSemi — Apprendre, sécuriser, construire. Le club Réseau & Cybersécurité de l'INPHB. »
> *EN* — "TianSemi — Learn, secure, build. The INPHB Network & Cybersecurity club."

**Contenus prioritaires à produire avant tout lancement élargi :**
- Page Club : texte mission/vision réel, liste des membres du bureau avec rôles, 3 à 5 activités réellement menées.
- Portfolio : remplacer le texte « Need a Creative Product? » par une présentation orientée réseau/sécurité, en cohérence avec le positionnement du club (ex. focus systèmes, réseaux, formation plutôt que « produit créatif »).
- Projets réels uniquement (Quiz, TOEIC, + tout projet club réel) ; retirer les 5 cartes factices ou les remplacer par des projets en préparation clairement étiquetés « à venir ».
- 3 premiers articles de blog pour amorcer la section (ex. « Bien démarrer en cybersécurité », un retour d'expérience de compétition technique, une fiche pratique Linux).
- Coordonnées réelles : adresse (ou ville/campus si l'adresse postale exacte n'est pas pertinente), un seul e-mail de contact réel, suppression des numéros factices ou remplacement par les vrais contacts du club.

**Principes d'optimisation transverses :** un seul message clé par section (éviter la redite « clean, intuitive, creative » générique du template), CTA actionnables et spécifiques (« Rejoindre TianSemi » plutôt que « Hire me » hérité du template), ton crédible et factuel pour un public académique/professionnel.

---

## 8. SEO avancé — plan d'action

**Métadonnées à ajouter sur chaque page** (exemple pour l'accueil) :

```html
<meta name="description" content="TianSemi, club Réseau & Cybersécurité de l'INPHB : apprentissage, blog technique et portfolio de Moulo Oholo Jean Noël.">
<link rel="canonical" href="https://tiansemi.github.io/">

<meta property="og:type" content="website">
<meta property="og:title" content="TianSemi — Club Réseau & Cybersécurité INPHB">
<meta property="og:description" content="Apprentissage, blog technique et portfolio professionnel.">
<meta property="og:image" content="https://tiansemi.github.io/assets/images/og-cover.png">
<meta property="og:url" content="https://tiansemi.github.io/">
<meta name="twitter:card" content="summary_large_image">

<link rel="alternate" hreflang="fr" href="https://tiansemi.github.io/fr/">
<link rel="alternate" hreflang="en" href="https://tiansemi.github.io/en/">
```

**`robots.txt` (racine du dépôt) :**
```
User-agent: *
Allow: /
Sitemap: https://tiansemi.github.io/sitemap.xml
```

**`sitemap.xml` (squelette, à générer/maintenir automatiquement — voir §15 CI/CD) :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://tiansemi.github.io/</loc><changefreq>weekly</changefreq></url>
  <url><loc>https://tiansemi.github.io/club/</loc><changefreq>monthly</changefreq></url>
  <url><loc>https://tiansemi.github.io/apprentissage/</loc><changefreq>monthly</changefreq></url>
  <url><loc>https://tiansemi.github.io/blog/</loc><changefreq>weekly</changefreq></url>
  <url><loc>https://tiansemi.github.io/portfolio/</loc><changefreq>monthly</changefreq></url>
</urlset>
```

**Données structurées Schema.org** (Person sur le portfolio, Organization sur le club) :
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TianSemi",
  "url": "https://tiansemi.github.io/club/",
  "description": "Club Réseau & Cybersécurité de l'INPHB",
  "memberOf": { "@type": "CollegeOrUniversity", "name": "INPHB" }
}
</script>
```

**Décision stratégique à trancher — bilinguisme :** conserver le sélecteur JS actuel (rapide, déjà fonctionnel, mais invisible aux moteurs de recherche) **ou** migrer vers des chemins distincts `/fr/` et `/en/` avec `hreflang` réciproques (effort plus élevé, mais nécessaire si le trafic international/SEO bilingue devient un objectif réel). Recommandation : conserver le switch JS pour le confort utilisateur immédiat (Sprint 1), planifier la migration `hreflang` comme item stratégique une fois le contenu multi-pages stabilisé (Sprint 6).

---

## 9. Recommandations techniques (avec code)

**9.1 — Supprimer la page orpheline et corriger le contenu factice**
```bash
git rm page01.html
```
```diff
- <address class="contact-info">941 Saqrqorish Road, alandalos, grnata, wa 47122-4194</address>
+ <address class="contact-info">INPHB, Yamoussoukro, Côte d'Ivoire</address>

- <a href="mailto:info@oholo.com">info@oholo.com</a>
+ <a href="mailto:contact@tiansemi.org">contact@tiansemi.org</a>

- <p class="copyright">&copy; 2022 <a href="#">codewithsadee</a>. All rights reserved</p>
+ <p class="copyright">&copy; <span id="year"></span> TianSemi. Tous droits réservés.</p>
```

**9.2 — Rendre le formulaire de contact fonctionnel (compatible statique GitHub Pages)**
```html
<form action="https://formspree.io/f/{form_id}" method="POST" class="contact-form">
```
Alternative équivalente : Getform ou EmailJS (appel `fetch` côté client). Les trois sont gratuits jusqu'à un volume raisonnable et ne nécessitent aucun serveur.

**9.3 — Corriger l'accessibilité des icônes sociales**
```diff
- <a href="#" class="hero-social-link">
+ <a href="https://facebook.com/tiansemi" class="hero-social-link" aria-label="Facebook">
    <ion-icon name="logo-facebook"></ion-icon>
    <div class="tooltip" aria-hidden="true">Facebook</div>
  </a>
```

**9.4 — `aria-expanded` dynamique sur le menu mobile (`script.js`)**
```javascript
navToggleBtn.addEventListener("click", function () {
  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
  const isOpen = navbar.classList.contains("active");
  navToggleBtn.setAttribute("aria-expanded", String(isOpen));
});
```

**9.5 — Retirer la suppression d'avertissement et restreindre le scope de l'auth (`firebase.js`)**
Supprimer le bloc qui réécrit `console.warn`. Si l'avertissement COOP gêne réellement l'UX du popup, basculer vers `signInWithRedirect` plutôt que masquer le signal.

**9.6 — Stabiliser le chargement des dépendances tierces avec SRI**
```html
<script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        integrity="sha384-<hash-à-générer>" crossorigin="anonymous" nomodule></script>
```

**9.7 — Réduire le CLS sur les images**
```diff
- <img src="./assets/images/html5.png" alt="HTML5 logo">
+ <img src="./assets/images/html5.png" alt="HTML5 logo" width="48" height="48" loading="lazy">
```
(garder l'image hero en `loading="eager"`/`fetchpriority="high"` car c'est le LCP).

**9.8 — Page 404 personnalisée** (`404.html` à la racine, reconnue nativement par GitHub Pages) reprenant le header/footer du site avec un message convivial et des liens vers les 4 pôles.

---

## 10. Sécurité — plan de remédiation

| Action | Priorité |
|---|---|
| Vérifier dans la console Firebase que seuls les domaines `tiansemi.github.io` (+ domaine custom éventuel) sont autorisés pour l'authentification | Haute |
| Documenter/auditer les règles Firestore/Storage si des données utilisateur sont stockées au-delà du profil d'auth | Haute |
| Supprimer la suppression de `console.warn` dans `firebase.js` | Moyenne |
| Ajouter une CSP via balise `<meta http-equiv="Content-Security-Policy">` restreignant les origines de script aux domaines de confiance (`gstatic.com`, `unpkg.com`, polices Google) | Moyenne |
| Ajouter des hash SRI sur les scripts CDN tiers | Moyenne |
| Activer Dependabot / alertes de sécurité GitHub sur `package-lock.json` (dépendance `firebase`) | Faible effort, à activer immédiatement |
| Clarifier l'usage réel de l'authentification (espace membre futur) ou la retirer temporairement de la navigation publique si elle n'a pas encore de fonction | Stratégique |

---

## 11. Accessibilité — plan de remédiation

- Ajouter `aria-label` explicites sur tous les liens icône (réseaux sociaux, sélecteur de langue).
- Ajouter `aria-expanded` au bouton de menu mobile (voir code §9.4).
- Lancer un audit Lighthouse/axe-core complet sur chaque gabarit de page une fois les contenus migrés (contrastes, ordre de tabulation, focus visible).
- Vérifier que tous les nouveaux composants (blog, fiches membres, parcours d'apprentissage) respectent une hiérarchie de titres unique et continue par page (un seul `h1`).
- S'assurer que les futurs blocs de code du blog disposent d'un contraste suffisant et d'une alternative texte pour les captures d'écran de terminal.

---

## 12. Product Backlog Agile

*(US = User Story, V = Valeur métier 1-5, P = Priorité, Pts = points d'effort Fibonacci)*

| ID | User Story | V | P | Pts |
|---|---|---|---|---|
| US-01 | En tant que **visiteur**, je veux trouver de vraies coordonnées de contact, afin de pouvoir réellement joindre le club ou M. Moulo. | 5 | Critique | 2 |
| US-02 | En tant que **recruteur**, je veux que le formulaire de contact envoie réellement un message, afin de ne pas perdre confiance dans le site. | 5 | Critique | 3 |
| US-03 | En tant que **visiteur**, je ne veux plus voir de mention de copyright erronée, afin que le site reflète la bonne identité du club. | 4 | Critique | 1 |
| US-04 | En tant qu'**administrateur du dépôt**, je veux supprimer `page01.html`, afin d'éviter le contenu dupliqué et la confusion de maintenance. | 3 | Haute | 1 |
| US-05 | En tant que **futur membre**, je veux une page Club avec mission, membres et activités, afin de comprendre TianSemi avant de le rejoindre. | 5 | Critique | 8 |
| US-06 | En tant qu'**étudiant**, je veux accéder rapidement aux formations cybersécurité, afin de commencer mon apprentissage sans difficulté. | 5 | Critique | 8 |
| US-07 | En tant que **lecteur**, je veux un blog technique avec des articles classés par catégorie, afin de suivre la veille cybersécurité du club. | 5 | Haute | 13 |
| US-08 | En tant que **recruteur**, je veux un portfolio dédié à M. Moulo séparé du club, afin d'évaluer son parcours individuel clairement. | 4 | Haute | 8 |
| US-09 | En tant que **moteur de recherche**, je veux des métadonnées (description, OG, sitemap, robots.txt), afin d'indexer correctement le site. | 4 | Haute | 5 |
| US-10 | En tant qu'**utilisateur de lecteur d'écran**, je veux que tous les liens icône soient correctement étiquetés, afin de naviguer sans ambiguïté. | 3 | Moyenne | 3 |
| US-11 | En tant que **contributeur du club**, je veux un design system documenté (couleurs, composants), afin de garder une cohérence visuelle en ajoutant du contenu. | 3 | Moyenne | 5 |
| US-12 | En tant que **mainteneur**, je veux un pipeline CI/CD qui valide et déploie automatiquement le site, afin de réduire le risque de régression. | 3 | Moyenne | 5 |
| US-13 | En tant que **partenaire académique**, je veux voir les partenaires et évènements du club, afin d'évaluer sa crédibilité institutionnelle. | 4 | Moyenne | 5 |
| US-14 | En tant qu'**étudiant**, je veux que le Quiz et le TOEIC soient rattachés à un parcours d'apprentissage cohérent, afin de comprendre leur utilité pédagogique. | 3 | Moyenne | 3 |
| US-15 | En tant que **visiteur**, je veux une page 404 utile, afin de ne pas être bloqué en cas de lien rompu. | 2 | Faible | 1 |
| US-16 | En tant que **membre connecté**, je veux que l'authentification Google ait une utilité concrète (suivi de progression), afin que la connexion ait un sens. | 3 | Optionnelle | 8 |

---

## 13. Roadmap par sprint

| Sprint | Objectif | Livrables principaux | Risques | Effort |
|---|---|---|---|---|
| **0 — Préparation** | Audit (ce rapport), nettoyage critique | Suppression `page01.html`, correction contenu factice (adresse, copyright, e-mails), formulaire fonctionnel | Aucun, correctifs à effort minimal | S |
| **1 — Refonte UX/UI** | Accueil portail + navigation 4 pôles | Nouvelle structure de navigation, design tokens, accueil avec teasers des 4 pôles | Risque de casser les liens existants vers `quiz.html`/`toeic.html` → prévoir redirections | M |
| **2 — Portfolio** | Espace dédié à M. Moulo | `/portfolio/` complet (parcours, compétences, certifications, CV, contact) | Dépend de la fourniture du contenu réel (CV, certifs) par M. Moulo | M |
| **3 — Site vitrine Club** | Présence officielle TianSemi | `/club/` complet (histoire, membres, activités, partenaires, CTA adhésion) | Dépend de la collecte d'infos auprès du bureau du club | L |
| **4 — Plateforme d'apprentissage** | Structurer les ressources pédagogiques | `/apprentissage/` avec 6 catégories, intégration Quiz/TOEIC existants | Volume de contenu pédagogique à produire | L |
| **5 — Blog technique** | Lancer la publication régulière | `/blog/` + 3 premiers articles + gabarit article réutilisable | Nécessite un flux éditorial soutenu pour rester actif | M |
| **6 — SEO / Perf / Accessibilité** | Indexation et qualité transverse | Meta/OG/sitemap/robots, correctifs accessibilité, audit Lighthouse, décision hreflang | Aucun majeur | M |
| **7 — Tests, corrections, déploiement** | Stabilisation finale | CI/CD GitHub Actions, page 404, recette croisée multi-device, mise en production | Risque de régressions de dernière minute → recette obligatoire avant bascule | S |

*(Tailles d'effort relatives : S = quelques jours, M = 1-2 semaines, L = 2-3 semaines, selon disponibilité bénévole des contributeurs du club.)*

---

## 14. Matrice Impact / Effort

**🟢 Quick Wins (fort impact / faible effort) — à faire en premier (Sprint 0) :**
- Corriger l'adresse, le téléphone, les e-mails et la mention de copyright (US-01, US-03)
- Supprimer `page01.html` (US-04)
- Rendre le formulaire de contact fonctionnel via Formspree (US-02)
- Ajouter `robots.txt`, meta description et `aria-label` manquants (US-09, US-10 partiel)
- Ajouter une page 404 (US-15)

**🔵 Stratégique (fort impact / fort effort) — cœur de la roadmap :**
- Page Club complète (US-05)
- Plateforme d'apprentissage structurée (US-06)
- Blog technique (US-07)
- Portfolio dédié (US-08)
- Architecture multi-pages globale (Sprint 1)

**⚪ Optionnel (impact plus limité ou différable) :**
- Espace membre connecté avec suivi de progression (US-16)
- Migration complète vers `hreflang` multi-URL (au-delà du switch JS actuel)
- CI/CD avancé avec Lighthouse CI en bloquant (US-12 — utile mais non bloquant pour le lancement)

---

## 15. Plan de déploiement GitHub Pages (CI/CD)

Le site reste statique : GitHub Pages le sert directement depuis la branche `main` (ou `gh-pages`), sans changement d'hébergement. Proposition de workflow minimal et compatible :

```yaml
# .github/workflows/deploy.yml
name: Build & Deploy
on:
  push:
    branches: [main]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Vérifier les liens cassés
        run: npx linkinator ./ --recurse --silent
      - name: Lint HTML
        run: npx htmlhint "**/*.html"
  deploy:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - uses: actions/deploy-pages@v4
```

**Étapes de mise en production recommandées :** (1) déployer Sprint 0 immédiatement (corrections critiques, risque nul) ; (2) déployer chaque pôle (Portfolio, Club, Apprentissage, Blog) dès qu'il est prêt plutôt que d'attendre un « big bang » final, pour limiter le risque et obtenir un retour utilisateur progressif ; (3) conserver `quiz.html` et `toeic.html` accessibles à leurs URLs actuelles ou mettre en place des redirections HTML simples (`<meta http-equiv="refresh">` ou liens 301 via page intermédiaire, GitHub Pages ne supportant pas les redirections serveur natives) si elles sont déplacées sous `/apprentissage/`.

---

## 16. Recommandations d'évolution à long terme

- **Espace membre** : donner un vrai rôle à l'authentification Google déjà en place (suivi de progression sur les quiz/TOEIC, badges, historique de participation aux évènements du club).
- **Générateur de site statique** : si le volume de contenu (blog + apprentissage) croît significativement, envisager une migration progressive vers un générateur statique (Eleventy, Astro ou Jekyll — ce dernier nativement supporté par GitHub Pages) pour gérer le contenu en Markdown plutôt qu'en HTML brut, tout en conservant une sortie 100 % statique compatible GitHub Pages.
- **Internationalisation complète** : passer du switch JS à une vraie structure `/fr/` `/en/` avec `hreflang`, une fois le volume de contenu stabilisé.
- **Showcase de compétitions** : capitaliser sur l'objectif de participation aux compétitions techniques en créant une section dédiée (CTF, challenges) qui deviendra un argument fort pour les partenaires académiques et industriels.
- **Mesure** : mettre en place une analytics respectueuse de la vie privée (Plausible, ou Firebase Analytics déjà initialisé) pour suivre réellement les indicateurs de succès définis en §2, et ajuster la roadmap chaque trimestre sur la base de données réelles plutôt que d'hypothèses.

---

*Rapport produit à partir de l'analyse du dépôt fourni (`site.zip`) et du site en production à `tiansemi.github.io`, consultés le 20 juin 2026.*
