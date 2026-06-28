# tiansemi.github.io

Static GitHub Pages site for the TianSemi portfolio, interactive quiz, and TOEIC flashcards page.

Pages:

- `index.html` - portfolio home page
- `portfolio/` - portfolio section (temporary page)
- `club/` - club section (temporary page)
- `apprentissage/` - learning section
- `apprentissage/quiz/` - interactive quiz
- `apprentissage/toeic/` - TOEIC flashcards revision tool
- `blog/` - technical blog section (temporary page)

The former `quiz.html` and `toeic.html` URLs are retained as redirect pages to preserve existing shared links.

## Contribuer

Les contributions sont réservées aux membres actifs reconnus par le bureau TianSemi. Le code est distribué sous la [TianSemi Club Internal Use License](LICENSE) : les personnes externes ne peuvent pas copier, modifier, redistribuer ou exploiter le dépôt sans autorisation écrite préalable du club, même si le dépôt est public.

Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour le flux de branches, la convention de commits, la revue des pull requests et le signalement responsable de vulnérabilités.

## Contact form

The contact form on `index.html` submits asynchronously to Formspree. Its public endpoint is configured directly in the form's `action` attribute; no API key is stored in this repository.

- Required fields: name, email address, and message. Phone is optional; when provided, it must use the international E.164 format with a country calling code (for example, `+2250777366687`, without spaces).
- Visitor feedback: the form shows sending, success, validation-error, and network-error states without leaving the page.
- End-to-end test: on 2026-06-20, a labelled technical test was accepted by Formspree (`HTTP 200`) and its receipt in `tiansemi@outlook.com` was confirmed.
- Contingency: monitor the Formspree free-plan quota in its dashboard. If it is reached, create a Getform or EmailJS form, replace only the `action` endpoint and retest the success/error states.

## Sprint 0 — Resolved user stories

### US 0.1 — Content clean-up

Completed. The site now displays the TianSemi contact details: Abidjan, Côte d’Ivoire; `tiansemi@outlook.com`; and `+2250777366687`. The footer uses the dynamic current year and the name `TianSemi Corp.`. Facebook, LinkedIn, YouTube, and GitHub point to active profiles; X/Twitter has been removed.

### US 0.2 — Remove the orphaned page

Completed in commit `3701788` (`chore: remove orphaned page01 duplicate`). `page01.html` has been removed and no functional internal reference remains. After each deployment, verify that `/page01.html` returns `404`.

### US 0.3 — Reliable contact channel

Completed. The form uses Formspree with asynchronous submission, accessible sending/success/error feedback, and client-side validation. Name, e-mail, and message are mandatory. Phone is optional but, when supplied, must use the international E.164 format with a country calling code. The end-to-end email test is confirmed.

### US 0.4 — Minimum SEO foundations

Completed. `robots.txt` allows crawling and references `sitemap.xml`; the sitemap lists the home page, quiz, and TOEIC pages. Each existing page has a unique meta description and canonical URL. On 2026-06-22, the `https://tiansemi.github.io/` property was verified in Google Search Console via an HTML verification file, and `sitemap.xml` was submitted successfully. Keep the verification file deployed to preserve ownership validation.

### US 0.5 — Helpful 404 page

Completed locally. `404.html` is present at the repository root for GitHub Pages, reuses the TianSemi header and footer styling, and provides direct links to the home page, quiz, TOEIC flashcards, and contact section. Verify it after deployment by opening a non-existent URL.

### US 0.6 — Repository governance

Completed. `LICENSE` defines the TianSemi Club Internal Use License for active members and restricts external use without written authorisation. `CONTRIBUTING.md` documents branches, commit conventions, pull-request review, local checks, and vulnerability reporting.

### US 0.7 — Dependency security monitoring

Completed. Dependabot is configured in `.github/dependabot.yml` to check npm dependencies weekly. On 2026-06-23, the dependency graph, Dependabot alerts, and Dependabot security updates were confirmed active for `tiansemi/tiansemi.github.io`. GitHub detected 14 dependency vulnerabilities on the default branch, confirming that security monitoring is operating.

### US 1.1 — Central design tokens

Completed. [`assets/css/tokens.css`](assets/css/tokens.css) centralises the TianSemi palette, typography, spacing, radii, shadows, and light/dark theme values. [`assets/css/style.css`](assets/css/style.css) imports these tokens, and the usage guide is available in [`docs/design-system.md`](docs/design-system.md).

### US 1.2 — TOEIC design-system alignment

Implemented. `apprentissage/toeic/index.html` now loads the global token file and contains no hard-coded colour values; its local variables map to the shared `--toeic-*` learning-module tokens and TianSemi brand tokens. The flashcard interaction code is unchanged. Perform a final visual pass through the revision flow after deployment.

### US 1.3 — Multi-page architecture

Completed. The `portfolio/`, `club/`, `apprentissage/`, and `blog/` sections are present with temporary pages. The learning structure includes `reseaux/`, `cybersecurite/`, `linux/`, `programmation/`, `cloud-devops/`, `ia/`, `quiz/`, and `toeic/`. Quiz and TOEIC have moved under `apprentissage/`; their former root URLs are retained as redirect pages.

### US 1.4 — Portal home page

Completed. The home page is now a TianSemi portal with Club and Learning calls to action, real statistics (2 interactive tools, 227 TOEIC words, and 13 vocabulary categories), four section teasers, responsive navigation, and the existing Formspree contact form.

## Apprentissage

La section `apprentissage/` est la plateforme pédagogique TianSemi. Elle regroupe :

- un hub principal : `apprentissage/index.html` ;
- 6 filières : Réseaux, Cybersécurité, Linux, Programmation, Cloud & DevOps, Intelligence artificielle ;
- les outils existants contextualisés : `apprentissage/quiz/` et `apprentissage/toeic/` ;
- les premières ressources pédagogiques :
  - `apprentissage/reseaux/adressage-ip/` ;
  - `apprentissage/cybersecurite/attaques-courantes/`.

Les anciennes URLs `quiz.html` et `toeic.html` restent disponibles sous forme de redirections afin de préserver les liens déjà partagés.

### Guide éditorial des ressources pédagogiques

Chaque nouvelle ressource doit rester concrète, courte et utile pour un étudiant :

- longueur recommandée : 800 à 1 500 mots ;
- structure minimale : titre clair, introduction, objectifs, contenu découpé en sections, résumé “À retenir”, liens de suite ;
- niveau explicitement indiqué : débutant, intermédiaire ou avancé ;
- contenu non factice : pas de promesse, d’activité ou de source inventée ;
- exemples techniques testables quand c’est pertinent ;
- tableaux, listes, blocs de code ou schémas simples pour faciliter la lecture ;
- blocs de code accessibles avec `class="learning-code"`, `role="region"`, `aria-label` et `data-code-label`.

Exemple de bloc de code :

```html
<pre
  class="learning-code"
  role="region"
  aria-label="Commandes de diagnostic réseau"
  data-code-label="Commandes de diagnostic"
><code>ping 8.8.8.8</code></pre>
```

Le script `assets/js/learning.js` ajoute automatiquement le bouton “Copier” sur les blocs `.learning-code`.

### Ajouter une ressource pédagogique

1. Créer un dossier sous la filière concernée, par exemple `apprentissage/reseaux/nom-de-la-ressource/`.
2. Ajouter un fichier `index.html` avec :
   - une meta description unique ;
   - une balise canonical ;
   - le header de navigation via `data-site-nav` ;
   - `assets/css/learning.css` ;
   - `assets/js/navigation.js` ;
   - `assets/js/learning.js` si la page contient des blocs de code.
3. Ajouter une carte de ressource sur la page de filière.
4. Ajouter l’URL dans `sitemap.xml`.
5. Vérifier :
   - absence de `noindex` ;
   - liens relatifs ;
   - hiérarchie des titres ;
   - boutons “Copier” ;
   - affichage mobile ;
   - lisibilité en thème clair et sombre.

### Sprint 4 — État de validation

Le Sprint 4 livre le hub Apprentissage, les 6 filières, la contextualisation Quiz/TOEIC, deux premières ressources réelles et l’accueil personnalisé minimal pour utilisateur Google connecté.

L’accueil personnalisé ne persiste aucune donnée de progression. Le stockage local est limité au nom d’affichage nécessaire à l’interface ; l’e-mail et la photo ne sont pas stockés dans `localStorage`.

Validation manuelle attendue avant clôture finale :

- ouvrir `apprentissage/` en visiteur non connecté ;
- se connecter avec Google et vérifier l’affichage `Bonjour [prénom]` ;
- se déconnecter depuis le Quiz et vérifier le retour à l’état visiteur ;
- suivre le parcours de démonstration : Accueil → Apprentissage → Réseaux → ressource Adressage IP → Quiz → retour Réseaux.

## Blog

La section `blog/` publie les articles techniques TianSemi et sert de levier SEO long terme. Les articles actuels couvrent :

- introduction à la cybersécurité ;
- retour d’expérience Huawei ICT ;
- tutoriel pratique de diagnostic réseau.

### Convention de nommage

Chaque article est un fichier HTML placé directement dans `blog/` selon la convention :

```text
blog/YYYY-MM-DD-slug-descriptif.html
```

Exemple :

```text
blog/2026-06-27-tutoriel-diagnostiquer-connectivite-reseau.html
```

Le slug doit être court, lisible, sans accent, en minuscules, séparé par des tirets.

### Charte éditoriale du blog

- Ton : clair, pédagogique, professionnel, orienté transmission.
- Public : étudiants, membres du club, partenaires techniques et recruteurs.
- Longueur recommandée :
  - introduction ou article de fond : 800 à 1 500 mots ;
  - retour d’expérience : 500 à 1 200 mots ;
  - tutoriel pratique : 600 à 1 500 mots.
- Structure minimale :
  - titre SEO explicite ;
  - introduction ;
  - sections titrées ;
  - exemples, tableaux ou blocs de code si pertinent ;
  - conclusion ou synthèse ;
  - section “Pour aller plus loin” ;
  - articles similaires.
- Rythme cible : viser 2 articles de qualité par mois lorsque l’équipe éditoriale est disponible.

### Métadonnées obligatoires

Chaque article doit inclure :

- un `<title>` unique ;
- une meta description unique ;
- une balise canonical ;
- des balises Open Graph (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`) ;
- des données structurées `Article` Schema.org en JSON-LD ;
- une image de couverture avec `alt` pertinent ;
- un indicateur de durée de lecture avec `data-reading-time`.

### Code, sécurité et accessibilité

- Highlight.js est chargé depuis CDN avec SRI.
- Les blocs de code sont enrichis par `assets/js/blog-article.js` :
  - coloration syntaxique ;
  - bouton “Copier le code” ;
  - `tabindex="0"` ;
  - `role="region"` ;
  - `aria-label`.
- Ne jamais publier de capture ou log contenant :
  - mot de passe ;
  - token/API key ;
  - adresse IP privée sensible ;
  - e-mail personnel non validé ;
  - information interne non destinée au public.

### Ajouter un nouvel article

1. Copier le gabarit d’un article existant.
2. Renommer le fichier selon `YYYY-MM-DD-slug.html`.
3. Mettre à jour :
   - titre ;
   - meta description ;
   - canonical ;
   - Open Graph ;
   - JSON-LD Article ;
   - auteur ;
   - date ;
   - catégorie ;
   - image de couverture.
4. Ajouter la carte correspondante dans `blog/index.html`.
5. Ajouter l’URL dans `sitemap.xml`.
6. Ajouter au moins un lien “Pour aller plus loin” vers une filière ou ressource `apprentissage/`.
7. Si l’article correspond à une filière, ajouter un lien retour depuis la page filière vers l’article.
8. Vérifier en local :
   - filtre par catégorie ;
   - lecture mobile/tablette/desktop ;
   - coloration du code ;
   - bouton copier ;
   - liens croisés Blog ↔ Apprentissage ;
   - absence de donnée sensible.

## SEO transverse

Le Sprint 6 consolide les métadonnées, le sitemap et les données structurées sur l'ensemble du site.

### Bloc meta attendu sur chaque page publique

Chaque page HTML publique doit contenir :

- un `<title>` unique ;
- une `<meta name="description">` unique et utile, idéalement proche de 150 à 160 caractères ;
- un `<link rel="canonical">` absolu vers l'URL finale ;
- des liens `hreflang="fr"` et `hreflang="x-default"` ;
- Open Graph : `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` ;
- Twitter Cards : `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

L'image Open Graph générique du site est :

```text
assets/images/og-cover.png
```

Elle doit rester en 1200 × 630 px pour un affichage propre lors du partage sur les réseaux sociaux.

### Données structurées Schema.org

Les pages clés utilisent JSON-LD :

- `Person` sur `portfolio/index.html` pour le profil de Moulo Oholo Jean Noël ;
- `Organization` sur `club/index.html` pour TianSemi ;
- `Article` sur chaque article du blog ;
- `BreadcrumbList` sur les pages profondes : portfolio, club, apprentissage et articles.

Après modification d'un bloc JSON-LD, valider la page avec Google Rich Results Test avant publication finale.

### Sitemap et robots.txt

`sitemap.xml` doit contenir uniquement les pages indexables finales. Ne pas y ajouter :

- `404.html` ;
- le fichier de validation Google ;
- les anciennes redirections `quiz.html` et `toeic.html`.

Après ajout, déplacement ou suppression d'une page :

1. vérifier la balise canonical de la page ;
2. ajouter ou retirer l'URL finale dans `sitemap.xml` ;
3. conserver `robots.txt` avec `Allow: /` et `Sitemap: https://tiansemi.github.io/sitemap.xml` ;
4. soumettre de nouveau le sitemap dans Google Search Console si le changement est important.

### Langue et bilinguisme

Décision Sprint 6 : le site conserve pour l'instant le switch de langue JavaScript existant. La migration vers des URLs distinctes `/fr/` et `/en/` est reportée à une phase dédiée, car elle demande une stratégie complète de contenus, redirections, canonicals et maintenance éditoriale.

Règles actuelles :

- chaque page publique est servie en `lang="fr"` par défaut ;
- le switch JS peut adapter les textes disponibles côté client ;
- les balises `hreflang="fr"` et `hreflang="x-default"` pointent vers l'URL canonique actuelle ;
- aucune URL `/en/` ne doit être déclarée tant que la version anglaise n'existe pas réellement.

Si la migration bilingue est engagée plus tard, créer d'abord les pages prioritaires `/fr/` et `/en/` pour l'accueil, le portfolio et les pages d'apprentissage principales, avec des balises `hreflang` réciproques.

## Performance

Le Sprint 6 privilégie des optimisations compatibles GitHub Pages, sans pipeline de build continu.

### Images

- Les images critiques visibles au chargement utilisent `loading="eager"` et `fetchpriority="high"`.
- Les images secondaires utilisent `loading="lazy"` et `decoding="async"`.
- Les images HTML déclarent `width` et `height` pour limiter le CLS.
- Les images PNG lourdes disposent d'une version WebP avec fallback PNG :
  - `assets/images/hero-banner.webp` ;
  - `assets/images/hero-banner-md.webp` ;
  - `assets/images/hero-banner-sm.webp` ;
  - `assets/images/toeic-study-banner.webp` ;
  - `assets/images/about-banner.webp`.

La page Portfolio utilise `<picture>` avec WebP prioritaire et PNG fallback. La page TOEIC utilise également une image hero HTML prioritaire au lieu d'un simple background CSS, afin d'exposer `loading`, `fetchpriority`, `width` et `height` au navigateur.

### CSS et JavaScript

Les pages publiques chargent les fichiers minifiés `.min.css` et `.min.js`. Les fichiers sources non minifiés restent dans le dépôt pour faciliter la maintenance.

Objectif de taille : raisonner par page chargée, pas par somme de tous les fichiers du dépôt. Chaque page ne charge qu'un sous-ensemble des ressources :

- navigation commune ;
- feuille de style de section ;
- script de section si nécessaire ;
- `firebase.min.js` uniquement sur les pages qui utilisent l'authentification Google.

### Régénérer les ressources minifiées

Procédure utilisée :

```powershell
# JS : exemple pour un fichier
npx.cmd --yes terser assets/js/navigation.js -c -o assets/js/navigation.min.js

# CSS : minifier sans inliner tokens.css, afin d'éviter de dupliquer les design tokens.
# Si clean-css est utilisé, vérifier que les @import vers tokens.min.css restent conservés.
```

Après minification :

1. vérifier les pages principales en local ;
2. tester le menu, le thème, les formulaires, le Quiz et TOEIC ;
3. relancer Lighthouse sur mobile ;
4. vérifier que `firebase.min.js` n'est pas chargé sur les pages qui n'utilisent pas l'authentification.

## Accessibilité

Le Sprint 6 vise un score Lighthouse Accessibilité ≥ 90 sur les pages principales et l'absence d'erreur critique axe-core.

### Pages à auditer manuellement

- Accueil : `/`
- Club : `/club/`
- Portfolio : `/portfolio/`
- Apprentissage : `/apprentissage/`
- Blog : `/blog/`
- Pages interactives : `/apprentissage/quiz/` et `/apprentissage/toeic/`

### Protocole manuel recommandé

1. Ouvrir chaque page en mobile et desktop.
2. Lancer Lighthouse en mode mobile, sans extensions si possible.
3. Lancer axe DevTools ou l'audit Accessibilité des DevTools.
4. Tester au clavier uniquement :
   - `Tab` pour avancer ;
   - `Shift + Tab` pour revenir ;
   - `Entrée` ou `Espace` pour activer les boutons ;
   - `Échap` pour fermer le menu mobile.
5. Vérifier que le focus reste toujours visible.
6. Vérifier que le menu mobile affiche tous les liens, le sélecteur de langue et le bouton de thème.
7. Tester le lien d'évitement : au premier `Tab`, “Aller au contenu principal” doit apparaître.
8. Vérifier les contrastes avec Lighthouse ou axe :
   - texte courant : ≥ 4,5:1 ;
   - grands textes et icônes utiles : ≥ 3:1.
9. Avec NVDA + Firefox :
   - lire les titres avec `H` ;
   - naviguer entre liens avec `K` ;
   - vérifier que le menu annonce son état ouvert/fermé via `aria-expanded`.
10. Noter chaque anomalie avec :
    - URL ;
    - sélecteur ou zone ;
    - impact utilisateur ;
    - capture ;
    - correction proposée.

Les corrections critiques WCAG AA sont prioritaires sur les warnings d'amélioration continue.

## Sécurité front-end

Le site applique une Content Security Policy via balise meta sur les pages HTML publiées. Le fichier de validation Google Search Console reste volontairement minimal et ne doit pas être modifié.

Origines explicitement autorisées :

- scripts locaux ;
- Highlight.js via `cdnjs.cloudflare.com` ;
- Ionicons via `unpkg.com` ;
- modules Firebase via `www.gstatic.com` ;
- Google Fonts via `fonts.googleapis.com` et `fonts.gstatic.com` ;
- formulaires Formspree via `formspree.io`.

Avant d'ajouter un nouveau CDN ou un nouveau service externe :

1. ajouter son domaine dans la directive CSP strictement nécessaire ;
2. ajouter `integrity` et `crossorigin="anonymous"` sur les scripts CDN statiques ;
3. tester la console navigateur en production et en local ;
4. vérifier que Formspree, Firebase, le menu, le thème, le Quiz, TOEIC et les articles de blog fonctionnent encore.

Les scripts inline existants sont encore autorisés pour compatibilité avec les données structurées JSON-LD, les redirections historiques et le module TOEIC. À long terme, déplacer ces scripts dans des fichiers `.js` permettrait de retirer `'unsafe-inline'` de `script-src`.

Dev - how to run locally

If you edit files and open them directly with the file:// protocol some browsers (or DevTools) may display or interpret file encoding differently which can make JS/CSS appear corrupted in DevTools. To avoid this, serve the site with a simple local HTTP server when developing:

Windows (PowerShell):

```powershell
npm install firebase
# from the repo root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or use `py -3 -m http.server 8000` if `python` points to Python 2 on your system.

This ensures the browser receives proper HTTP headers and avoids file:// encoding/display edge cases.
