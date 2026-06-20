# Plan d'Exécution Agile Détaillé — Transformation TianSemi

**De Product Owner Senior, Scrum Master Senior et Chef de Projet Digital**
*Décomposition complète des 8 sprints du backlog initial en Epics, User Stories, tâches techniques, critères d'acceptation, estimations et plans de validation.*

---

## Méthodologie & hypothèses de planification

Avant de détailler chaque sprint, voici les hypothèses retenues pour que les estimations restent réalistes (à ajuster avec l'équipe réelle) :

- **Cadence :** Scrum, sprints de **2 semaines**.
- **Équipe type :** 1 Product Owner / Scrum Master (rôle combiné, réaliste pour un club étudiant), 2 à 3 développeurs front-end bénévoles à temps partiel, 1 contributeur contenu/design, appui ponctuel des membres du bureau TianSemi pour la matière (mission, activités, partenaires…).
- **Vélocité cible :** ~20 à 25 points par sprint pour une équipe bénévole à temps partiel. **Tout sprint dépassant 25 points doit être découpé ou étalé sur 3 semaines** — c'est signalé explicitement quand c'est le cas.
- **Définition of Done (DoD) transverse**, applicable à toute User Story sauf mention contraire :
  1. Code revu par au moins un autre contributeur (pull request).
  2. Aucune régression visuelle ou fonctionnelle sur les pages existantes.
  3. Testé sur mobile (< 480px), tablette et desktop.
  4. Aucune erreur console au chargement.
  5. Déployé sur l'environnement de prévisualisation (branche ou Pages preview) avant fusion sur `main`.
  6. Accepté par le Product Owner lors de la revue de sprint.
- **Numérotation des User Stories :** `US-<sprint>.<numéro>` (ex. `US-0.1` = première User Story du Sprint 0) pour assurer la traçabilité complète jusqu'au tableau récapitulatif final.

---

# Sprint 0 — Fondations & Stabilisation Critique

## Vision du Sprint
Restaurer immédiatement la crédibilité du site (contenu factice, contact non fonctionnel) et poser les fondations techniques et de gouvernance minimales, **avant toute évolution fonctionnelle visible**. C'est le sprint au rapport effort/impact le plus élevé de toute la roadmap.

## Objectifs
- Éliminer tout contenu factice ou trompeur restant du template d'origine.
- Rendre le formulaire de contact réellement fonctionnel.
- Supprimer la dette technique immédiate (`page01.html`).
- Poser les fondations SEO minimales (`robots.txt`, meta description, page 404).
- Poser la gouvernance du dépôt (licence, guide de contribution, alertes de sécurité).

## Valeur Métier
Chaque visiteur qui découvre le site **dès aujourd'hui** (recruteur, partenaire académique, étudiant) doit percevoir un site fini et fiable plutôt qu'un template non terminé. C'est un risque de réputation à neutraliser à coût quasi nul, avant d'investir dans des fonctionnalités plus ambitieuses qui seraient sinon vues par un public déjà échaudé.

## Epics

### Epic 0.1 — Assainissement du contenu existant

#### User Story 0.1
En tant que **visiteur**
Je souhaite **voir des coordonnées réelles et une mention de copyright correcte**
Afin de **faire confiance au site dès la première visite**

Critères d'acceptation :
- L'adresse factice « 941 Saqrqorish Road, alandalos, grnata, wa 47122-4194 » est remplacée par une information réelle ou neutre (ville/campus INPHB).
- Les numéros de téléphone factices sont remplacés par un contact réel du club, ou retirés s'il n'y en a pas.
- Les e-mails `info@oholo.com` / `support@oholo.com` sont remplacés par une adresse réelle.
- Le footer affiche « © [année dynamique] TianSemi » au lieu de « © 2022 codewithsadee ».
- Chaque lien social pointe vers un vrai profil ou est masqué s'il n'existe pas encore.

Tâches techniques :
- Recueillir les informations réelles auprès de M. Moulo et du bureau du club (questionnaire court à diffuser en amont du sprint).
- Modifier la section contact et le footer de `index.html`.
- Vérifier la cohérence du calcul dynamique de l'année déjà présent dans `script.js` (`applyTranslations`/`copyright`).
- Auditer un par un les liens sociaux et supprimer ceux non actifs.

Dépendances : nécessite la collecte d'informations réelles — **bloquant tant que non fournies par le club**.
Risques : informations indisponibles à temps → masquer les champs concernés plutôt que de laisser du contenu factice en ligne.
Estimation : **Story Points : 2**

#### User Story 0.2
En tant qu'**administrateur du dépôt**
Je souhaite **supprimer le fichier `page01.html` orphelin**
Afin d'**éviter le contenu dupliqué indexable et la confusion de maintenance**

Critères d'acceptation :
- `page01.html` n'existe plus ni dans le dépôt ni sur le site déployé.
- Aucun lien interne ou externe connu ne pointe encore vers `page01.html`.
- Si un lien externe partagé existe, une redirection HTML simple vers `index.html` est mise en place.

Tâches techniques :
- Recherche globale (`grep -r "page01"`) pour confirmer l'absence de référence interne.
- `git rm page01.html` avec message de commit explicite.
- Vérification post-déploiement (404 attendu ou redirection fonctionnelle).

Dépendances : aucune.
Risques : faible, sauf si la page a été partagée publiquement (CV, réseaux) sans que l'équipe le sache.
Estimation : **Story Points : 1**

### Epic 0.2 — Canal de contact fiable

#### User Story 0.3
En tant que **recruteur ou partenaire**
Je souhaite **que le formulaire de contact envoie réellement un message**
Afin de **pouvoir joindre le club ou M. Moulo sans frustration**

Critères d'acceptation :
- Le formulaire transmet les données à un service tiers fonctionnel compatible hébergement statique (Formspree, Getform ou EmailJS).
- Un message de confirmation visuel s'affiche après envoi réussi.
- Un message d'erreur clair s'affiche en cas d'échec réseau ou de validation.
- Le destinataire réel reçoit effectivement le message (test de bout en bout effectué et documenté).
- Les champs requis (nom, e-mail, message) sont validés côté client avant envoi.

Tâches techniques :
- Créer un compte sur le service choisi et configurer le endpoint de réception.
- Modifier l'attribut `action`/la logique de soumission du formulaire dans `index.html`.
- Ajouter la gestion JS de soumission asynchrone (`fetch`) avec états succès/erreur/chargement.
- Effectuer un test d'envoi réel en conditions de production.

Dépendances : dépend d'une adresse e-mail réelle de réception (US-0.1).
Risques : quota gratuit du service tiers dépassé en cas de pic → documenter un plan de bascule vers un fournisseur alternatif.
Estimation : **Story Points : 3**

### Epic 0.3 — Fondations SEO minimales

#### User Story 0.4
En tant que **moteur de recherche**
Je souhaite **disposer d'un `robots.txt` et d'une meta description sur chaque page existante**
Afin d'**indexer correctement le site dès son état actuel**

Critères d'acceptation :
- `robots.txt` présent à la racine, autorisant l'exploration et référençant `sitemap.xml`.
- Meta description unique et pertinente présente sur `index.html`, `quiz.html`, `toeic.html`.
- Balise `canonical` présente sur chaque page.

Tâches techniques :
- Créer `robots.txt` selon le modèle défini en audit (§8).
- Ajouter meta description + canonical sur les trois pages existantes.
- Soumettre l'URL racine à Google Search Console pour validation (si accès disponible).

Dépendances : aucune.
Risques : faible.
Estimation : **Story Points : 2**

#### User Story 0.5
En tant que **visiteur arrivant sur un lien rompu**
Je souhaite **une page 404 utile**
Afin de **ne pas être bloqué sans solution**

Critères d'acceptation :
- `404.html` présent à la racine (reconnu nativement par GitHub Pages).
- Reprend le header/footer du site.
- Propose des liens vers les pages principales existantes.

Tâches techniques :
- Créer `404.html` avec un gabarit cohérent avec le reste du site.
- Tester en accédant à une URL inexistante sur le déploiement.

Dépendances : aucune.
Risques : faible.
Estimation : **Story Points : 1**

### Epic 0.4 — Gouvernance & sécurité du dépôt

#### User Story 0.6
En tant que **mainteneur du dépôt**
Je souhaite **une licence et un guide de contribution**
Afin de **cadrer les contributions futures des membres du club**

Critères d'acceptation :
- Fichier `LICENSE` présent (licence validée avec le club, ex. MIT pour le code).
- Fichier `CONTRIBUTING.md` décrivant le processus de contribution (branches, convention de commit, revue).
- `README.md` mis à jour avec une section « Contribuer ».

Tâches techniques :
- Choisir et ajouter la licence avec le bureau du club.
- Rédiger `CONTRIBUTING.md`.
- Mettre à jour `README.md`.

Dépendances : aucune.
Risques : faible.
Estimation : **Story Points : 2**

#### User Story 0.7
En tant que **mainteneur**
Je souhaite **activer les alertes de sécurité automatiques sur le dépôt**
Afin d'**être informé des vulnérabilités de dépendances (ex. firebase)**

Critères d'acceptation :
- Dependabot activé sur le dépôt GitHub.
- Alertes de sécurité GitHub activées.
- Une vérification manuelle confirme la bonne réception d'une alerte de test.

Tâches techniques :
- Activer Dependabot dans les paramètres du dépôt.
- Configurer `dependabot.yml` (écosystème npm, fréquence hebdomadaire).

Dépendances : aucune.
Risques : faible.
Estimation : **Story Points : 1**

## Architecture concernée
Aucun changement structurel : le site reste mono-page pour ce sprint. Préparation documentaire uniquement (gouvernance).

## Design concerné
Aucun changement visuel majeur ; uniquement des corrections de contenu textuel et du footer.

## SEO concerné
Fondations : `robots.txt`, meta description, `canonical` — prérequis indispensables avant l'indexation de toute nouvelle page aux sprints suivants.

## Accessibilité concernée
Non prioritaire ce sprint (traité en Sprint 1 et approfondi en Sprint 6) ; aucune régression ne doit être introduite.

## Sécurité concernée
Activation de Dependabot et des alertes de sécurité GitHub sur la dépendance `firebase`.

## Livrables
- Site avec contenu de contact et footer corrigés.
- Formulaire de contact fonctionnel et testé.
- `robots.txt`, `404.html`, `LICENSE`, `CONTRIBUTING.md` livrés.
- `page01.html` supprimé.

## Démonstration de fin de Sprint
Revue collective du site en production montrant les corrections (captures avant/après), démonstration d'un envoi réel via le formulaire de contact reçu en direct.

## KPIs
- 0 contenu factice restant (checklist de relecture validée).
- Taux de succès du formulaire de contact = 100 % sur les tests de recette.
- Page d'accueil indexée sans erreur dans Search Console.

## Risques
| Risque | Impact | Mitigation |
|---|---|---|
| Informations réelles (adresse, contact) non fournies à temps par le bureau du club | Bloque US-0.1 et US-0.3 | Fixer un délai de collecte avant le sprint ; à défaut, utiliser un contenu neutre non mensonger |
| Quota gratuit du service de formulaire dépassé | Perte de messages entrants | Choisir un service avec alerte de quota, documenter le plan de bascule |

## Plan de validation
- Relecture croisée du contenu par un second membre du club.
- Test d'envoi réel du formulaire de bout en bout (réception confirmée).
- Vérification de tous les liens (internes et sociaux) avant clôture du sprint.

## Documentation à produire
- Changelog du sprint.
- `README.md` mis à jour (section Contribuer, informations de contact à maintenir).
- Fiche procédure « comment mettre à jour les coordonnées de contact ».

---

# Sprint 1 — Refonte UX/UI & Architecture de Navigation

## Vision du Sprint
Faire passer le site d'une page unique à une **architecture multi-pages** portant les 4 pôles (Portfolio, Club, Apprentissage, Blog), avec un design system centralisé. C'est le sprint charnière : tous les sprints suivants (2 à 5) dépendent de cette architecture.

## Objectifs
- Centraliser les design tokens (couleurs, typographie, espacements).
- Harmoniser `toeic.html` avec le design system global (actuellement un système de couleurs divergent en `<style>` inline).
- Créer l'arborescence de dossiers multi-pages cible.
- Construire la page d'accueil « portail » avec teasers des 4 pôles.
- Mettre en place la navigation principale responsive et cohérente sur tout le site.
- Corriger l'accessibilité de base du header et de la navigation.

## Valeur Métier
Pose les fondations indispensables à tous les sprints suivants — Portfolio, Club, Apprentissage et Blog ne peuvent pas être construits proprement sans cette architecture. Améliore aussi immédiatement l'image de marque par la cohérence visuelle.

## Epics

### Epic 1.1 — Design System

#### User Story 1.1
En tant que **contributeur (designer/développeur)**
Je souhaite **un fichier de tokens CSS centralisé (couleurs, typographie, espacements)**
Afin de **garantir une cohérence visuelle sur toutes les pages futures**

Critères d'acceptation :
- `assets/css/tokens.css` créé avec les variables CSS reprenant la proposition de design system (audit §6).
- `style.css` utilise ces variables au lieu de valeurs codées en dur.
- Au moins 80 % des couleurs codées en dur dans `style.css` sont remplacées par des variables (vérifié par recherche).

Tâches techniques :
- Extraire les couleurs/typographies/espacements actuellement codés en dur dans `style.css`.
- Créer `tokens.css`.
- Remplacer progressivement les valeurs dans `style.css`, page par page.
- Documenter les tokens dans un mini guide de style.

Dépendances : aucune, peut démarrer immédiatement.
Risques : régression visuelle si remplacement mal testé → recette visuelle systématique après chaque remplacement.
Estimation : **Story Points : 5**

#### User Story 1.2
En tant que **contributeur**
Je souhaite **harmoniser `toeic.html` avec le design system global**
Afin d'**éliminer la divergence de palette actuelle (styles inline dupliqués)**

Critères d'acceptation :
- Le bloc `<style>` inline de `toeic.html` n'utilise plus de couleurs codées en dur mais les tokens globaux.
- Le rendu visuel de `toeic.html` reste fonctionnellement identique (pas de régression UX du module flashcards).

Tâches techniques :
- Lier `tokens.css` à `toeic.html`.
- Remplacer les variables locales (`--bg`, `--primary`, etc.) par les tokens globaux ou les aligner explicitement.
- Test visuel complet du module TOEIC après modification.

Dépendances : US-1.1.
Risques : régression visuelle mineure possible sur les flashcards → test manuel complet du flux de révision.
Estimation : **Story Points : 3**

### Epic 1.2 — Architecture multi-pages & navigation

#### User Story 1.3
En tant que **mainteneur**
Je souhaite **une structure de dossiers multi-pages (`portfolio/`, `club/`, `apprentissage/`, `blog/`)**
Afin de **préparer l'accueil des contenus des sprints suivants**

Critères d'acceptation :
- Arborescence créée conforme au sitemap défini dans l'audit (§4).
- Chaque dossier contient au minimum une page `index.html` « en construction » temporaire.
- Les chemins relatifs des assets (CSS/JS/images) fonctionnent correctement depuis la profondeur de dossier ajoutée.

Tâches techniques :
- Créer les dossiers `/portfolio/`, `/club/`, `/apprentissage/` (+ sous-dossiers `reseaux/`, `cybersecurite/`, `linux/`, `programmation/`, `cloud-devops/`, `ia/`), `/blog/`.
- Décider avec le PO : déplacer `quiz.html`/`toeic.html` vers `/apprentissage/quiz/` et `/apprentissage/toeic/`, ou conserver leurs URLs actuelles avec lien profond depuis Apprentissage.
- Si déplacement : mettre en place des redirections HTML pour les anciennes URLs.
- Vérifier tous les chemins relatifs (CSS, JS, images) depuis les nouveaux niveaux de profondeur.

Dépendances : décision produit préalable sur le maintien ou non des URLs actuelles de quiz/TOEIC.
Risques : rupture de liens déjà partagés (réseaux sociaux, CV) si les URLs changent sans redirection → toujours prévoir une redirection systématique.
Estimation : **Story Points : 5**

#### User Story 1.4
En tant que **visiteur**
Je souhaite **une page d'accueil « portail » présentant les 4 pôles du site**
Afin de **naviguer facilement vers ce qui m'intéresse**

Critères d'acceptation :
- Hero avec accroche du club et deux CTA principaux (« Découvrir le club », « Commencer à apprendre »).
- Bandeau de statistiques réelles affiché (et non factices comme « 95+ Happy Clients »).
- Une section teaser par pôle (Club, Apprentissage, Blog, Portfolio) avec lien « en savoir plus ».
- Page responsive (mobile-first), sans régression de performance significative par rapport à la baseline du Sprint 0.

Tâches techniques :
- Refondre la structure HTML de `index.html` selon le wireframe du portail (audit §5).
- Adapter le CSS avec les nouveaux tokens.
- Rédiger les textes provisoires en cohérence avec la stratégie de contenu (à affiner aux sprints 2-5).
- Intégrer les statistiques réelles déjà disponibles, ou des placeholders explicitement neutres sinon.

Dépendances : US-1.1, US-1.3 ; le contenu définitif des autres pôles dépend des sprints suivants (teasers provisoires acceptés).
Risques : contenu réel des pôles pas encore prêt → utiliser des teasers génériques mais non mensongers, à mettre à jour progressivement à chaque sprint.
Estimation : **Story Points : 8**

#### User Story 1.5
En tant qu'**utilisateur mobile ou desktop**
Je souhaite **une navigation principale claire vers les 4 pôles**
Afin de **me repérer sur l'ensemble du site**

Critères d'acceptation :
- Menu principal : Accueil, Club, Apprentissage, Blog, Portfolio, Contact.
- Menu fonctionnel en version mobile (burger) et desktop.
- L'élément de menu actif est visuellement indiqué selon la page courante.
- Navigation cohérente sur toutes les pages du site, y compris quiz/TOEIC.

Tâches techniques :
- Factoriser le composant de navigation pour limiter la duplication (le site reste sans framework de build : documenter une procédure de mise à jour multi-fichiers maîtrisée).
- Mettre à jour `script.js` pour gérer l'état actif du menu.
- Tester sur toutes les pages existantes et nouvelles.

Dépendances : US-1.3.
Risques : sans système de templating, la duplication de la navigation sur chaque page crée un risque de désynchronisation → documenter clairement la procédure, évaluer un outil de build léger en roadmap long terme (cf. recommandations §16 de l'audit).
Estimation : **Story Points : 5**

### Epic 1.3 — Accessibilité transverse (base)

#### User Story 1.6
En tant qu'**utilisateur de lecteur d'écran ou de clavier**
Je souhaite **que les éléments interactifs du header (menu, icônes sociales, sélecteur de langue) soient correctement étiquetés et que leur état soit annoncé**
Afin de **naviguer sans ambiguïté**

Critères d'acceptation :
- Tous les liens icône ont un `aria-label` explicite.
- Le bouton de menu mobile expose `aria-expanded` reflétant son état réel.
- Le sélecteur de langue a un label associé (visible ou `aria-label`).
- Navigation complète au clavier testée (tab / shift+tab / entrée) sur le header et la navigation.

Tâches techniques :
- Implémenter les correctifs définis en audit §9.3-9.4.
- Ajouter un label au sélecteur de langue.
- Test manuel clavier + lecteur d'écran (NVDA ou VoiceOver) sur le header.

Dépendances : aucune, peut être traité en parallèle.
Risques : faible.
Estimation : **Story Points : 3**

## Architecture concernée
Passage mono-page → multi-pages ; mise en place de l'arborescence cible définie en audit §3-4.

## Design concerné
Design system complet : tokens centralisés, harmonisation de `toeic.html`.

## SEO concerné
La nouvelle architecture multi-pages crée des URLs indexables individuellement par pôle (effet positif différé ; métadonnées complètes traitées en Sprint 6).

## Accessibilité concernée
Corrections du header et de la navigation globale (US-1.6).

## Sécurité concernée
Aucune action dédiée ce sprint.

## Livrables
- Arborescence multi-pages.
- Page d'accueil portail.
- Navigation globale cohérente.
- Design system documenté (`tokens.css` + guide de style).

## Démonstration de fin de Sprint
Parcours de navigation live entre les 4 pôles (même si le contenu de chacun est encore minimal), démontrant la cohérence visuelle et la navigation responsive.

## KPIs
- 0 lien cassé après migration (vérifié par un outil de vérification de liens).
- Score Lighthouse Accessibilité du header ≥ 90.
- Temps de chargement de l'accueil non dégradé par rapport à la baseline du Sprint 0.

## Risques
| Risque | Impact | Mitigation |
|---|---|---|
| Rupture des URLs existantes de quiz/TOEIC | Perte de trafic et de liens partagés | Redirections HTML systématiques + communication aux membres du club |
| Duplication de la navigation difficile à maintenir sans templating | Désynchronisation entre pages au fil du temps | Documentation de procédure stricte + évaluation d'un outil de build léger en roadmap long terme |

## Plan de validation
- Recette croisée sur 3 navigateurs et un mobile réel.
- Vérification de toutes les redirections mises en place.
- Revue du contenu du portail par le Product Owner avant clôture.

## Documentation à produire
- Guide de style (design tokens).
- Procédure de mise à jour de la navigation multi-fichiers.
- Schéma d'arborescence mis à jour dans `README.md`.

---

# Sprint 2 — Portfolio Professionnel

## Vision du Sprint
Construire l'espace dédié à M. MOULO OHOLO JEAN NOËL au sein de l'arborescence créée au Sprint 1, en remplaçant intégralement le contenu générique du template par un contenu professionnel réel, et en assainissant la galerie de projets.

## Objectifs
- Créer les pages présentation/parcours, compétences, certifications du portfolio.
- Rendre le CV téléchargeable.
- Mettre en place un point de contact dédié aux recruteurs.
- Retirer les projets factices et ne conserver que des réalisations réelles.

## Valeur Métier
Le portfolio est le point de contact direct avec les recruteurs et partenaires individuels. Un profil professionnel crédible et complet augmente directement les chances d'opportunités pour M. Moulo et renforce la réputation du club par association.

## Epics

### Epic 2.1 — Pages Portfolio

#### User Story 2.1
En tant que **recruteur**
Je souhaite **consulter la présentation et le parcours de M. Moulo**
Afin d'**évaluer son profil professionnel**

Critères d'acceptation :
- `/portfolio/index.html` présente une bio réelle remplaçant le texte générique « Need a Creative Product? I can Help You! ».
- Le parcours (formation, expériences) est présenté de façon chronologique ou par catégorie.
- Un lien vers le CV téléchargeable est visible.
- La page respecte le design system du Sprint 1.

Tâches techniques :
- Recueillir bio, parcours et photo professionnelle auprès de M. Moulo.
- Construire le gabarit HTML de la page portfolio (header/nav réutilisés du Sprint 1).
- Rédiger le contenu définitif.
- Adapter le style avec les tokens centralisés.

Dépendances : US-1.3, US-1.5.
Risques : contenu (CV, parcours) non fourni à temps → contenu provisoire marqué « à compléter » en environnement de prévisualisation uniquement, jamais publié en l'état.
Estimation : **Story Points : 5**

#### User Story 2.2
En tant que **recruteur**
Je souhaite **voir le détail des compétences de M. Moulo organisées par catégorie**
Afin d'**évaluer rapidement l'adéquation avec un besoin**

Critères d'acceptation :
- `/portfolio/competences.html` présente les compétences groupées par catégorie avec un niveau indicatif.
- Remplace la simple liste d'icônes génériques du template par un contenu représentatif du profil réel (réseaux/sécurité, pas uniquement front-end).
- Page accessible depuis la page portfolio principale.

Tâches techniques :
- Recueillir la liste réelle des compétences et niveaux avec M. Moulo.
- Construire le composant « carte de compétence » réutilisant le design system.
- Implémenter la page.

Dépendances : US-2.1, US-1.1.
Risques : faible.
Estimation : **Story Points : 3**

#### User Story 2.3
En tant que **recruteur**
Je souhaite **consulter les certifications obtenues par M. Moulo**
Afin de **vérifier la validité de ses compétences déclarées**

Critères d'acceptation :
- `/portfolio/certifications.html` liste chaque certification (nom, organisme, date, lien de vérification si disponible).
- Page responsive et accessible.

Tâches techniques :
- Recueillir la liste des certifications.
- Implémenter le gabarit liste/carte.

Dépendances : US-2.1.
Risques : faible.
Estimation : **Story Points : 2**

#### User Story 2.4
En tant que **recruteur**
Je souhaite **télécharger le CV de M. Moulo au format PDF**
Afin de **le conserver et le partager en interne**

Critères d'acceptation :
- Bouton « Télécharger le CV » fonctionnel depuis la page Portfolio.
- Fichier PDF à jour, optimisé en poids (< 2 Mo).
- Bouton accessible (texte clair, pas seulement une icône).

Tâches techniques :
- Obtenir un CV PDF à jour auprès de M. Moulo.
- Optimiser le PDF (compression).
- Ajouter le lien de téléchargement avec attribut `download`.

Dépendances : US-2.1.
Risques : CV non maintenu à jour dans la durée → ajouter une consigne dans `CONTRIBUTING.md`/`README.md`.
Estimation : **Story Points : 1**

#### User Story 2.5
En tant que **recruteur**
Je souhaite **un point de contact dédié au portfolio professionnel**, distinct du contact général du club
Afin de **m'adresser directement à M. Moulo**

Critères d'acceptation :
- Section/page contact sur `/portfolio/` avec formulaire fonctionnel routé vers l'adresse professionnelle de M. Moulo.
- Mention claire de disponibilité (ex. « ouvert aux opportunités »).

Tâches techniques :
- Adapter le composant formulaire de contact du Sprint 0 avec un endpoint dédié.
- Tester l'envoi réel.

Dépendances : US-0.3, US-2.1.
Risques : faible.
Estimation : **Story Points : 2**

### Epic 2.2 — Contenu réel des projets

#### User Story 2.6
En tant que **recruteur ou partenaire**
Je souhaite **voir uniquement des projets réels dans la galerie portfolio**
Afin d'**évaluer le travail effectif de M. Moulo et du club**

Critères d'acceptation :
- Les 5 cartes de projets factices (Web Interface Study, Dashboard Prototype, Travel Workflow, Product Landing, Visual Toolkit) sont retirées ou remplacées.
- Seuls des projets réels (Quiz, TOEIC + tout projet réel additionnel) apparaissent, ou des projets « à venir » explicitement étiquetés comme tels.
- Chaque carte projet renvoie vers une page de détail ou la ressource réelle correspondante.

Tâches techniques :
- Inventorier avec M. Moulo et le club les projets réels disponibles à présenter.
- Retirer les cartes factices et leurs images stock associées (`project-3.png` à `project-7.png`).
- Ajouter les nouvelles cartes réelles avec visuels authentiques.

Dépendances : US-2.1.
Risques : nombre de projets réels limité à ce stade → accepter un nombre réduit de cartes plutôt que de combler avec du contenu factice.
Estimation : **Story Points : 3**

## Architecture concernée
Utilise l'arborescence `/portfolio/` créée au Sprint 1 ; aucune nouvelle structure transverse.

## Design concerné
Application du design system ; introduction des composants « carte de compétence » et « carte de certification ».

## SEO concerné
Ajout de meta description et titres uniques sur chaque nouvelle page portfolio dès sa création, pour éviter d'accumuler une nouvelle dette SEO (la généralisation complète reste traitée au Sprint 6).

## Accessibilité concernée
Formulaire de contact dédié accessible (labels, validation) ; textes alternatifs sur les visuels de projets.

## Sécurité concernée
Aucune action dédiée ce sprint.

## Livrables
- Pages Portfolio complètes : présentation, compétences, certifications, CV, contact dédié.
- Galerie de projets assainie (projets réels uniquement).

## Démonstration de fin de Sprint
Parcours recruteur complet : de l'accueil jusqu'au téléchargement du CV et à l'envoi d'un message via le formulaire dédié.

## KPIs
- 0 contenu factice restant dans le portfolio.
- CV téléchargé avec succès lors des tests.
- Formulaire dédié testé de bout en bout (réception confirmée).

## Risques
| Risque | Impact | Mitigation |
|---|---|---|
| Disponibilité limitée de M. Moulo pour fournir bio, CV, certifications | Retard sur l'ensemble de l'Epic 2.1 | Planifier une session de collecte dédiée en amont du sprint |
| Projets réels en nombre limité | Galerie peu fournie au lancement | Étiqueter clairement les projets « à venir » plutôt que de combler avec du contenu factice |

## Plan de validation
- Relecture et validation finale du contenu par M. Moulo lui-même.
- Test multi-device de toutes les pages portfolio.
- Vérification du lien de téléchargement du CV.

## Documentation à produire
- Procédure de mise à jour du CV et des compétences.
- Section « Portfolio » ajoutée au `README.md`.

---

# Sprint 3 — Site Vitrine Club TianSemi

## Vision du Sprint
Donner au club TianSemi sa première présence officielle structurée : histoire, mission, membres, activités, évènements, partenaires, et un parcours clair pour rejoindre le club.

## Objectifs
- Rédiger et publier l'histoire, la mission et la vision du club.
- Présenter l'organisation et les membres du bureau.
- Documenter les activités, évènements et partenariats réels.
- Mettre en place un parcours d'adhésion clair.

## Valeur Métier
C'est le sprint qui comble l'écart le plus important identifié dans l'audit initial : à ce stade, **le mot « TianSemi » n'existe que dans le titre du site**, sans aucune page dédiée. Ce sprint transforme le site en véritable vitrine institutionnelle, condition nécessaire pour le recrutement de membres et la crédibilité auprès des partenaires académiques.

## Epics

### Epic 3.1 — Identité du club

#### User Story 3.1
En tant que **futur membre ou partenaire**
Je souhaite **connaître l'histoire, la mission et la vision de TianSemi**
Afin de **comprendre la raison d'être du club avant de m'engager**

Critères d'acceptation :
- `/club/index.html` présente les sections Histoire, Mission, Vision avec du contenu réel (non générique).
- Bandeau de chiffres clés réels (année de création, nombre de membres, projets menés).
- Page liée depuis la navigation principale et depuis le teaser accueil créé au Sprint 1.

Tâches techniques :
- Organiser une collecte d'information avec le bureau du club (histoire, mission, vision, chiffres).
- Construire le gabarit de page Club avec le design system.
- Rédiger et intégrer le contenu ; mettre à jour le teaser de l'accueil.

Dépendances : US-1.3, US-1.4.
Risques : contenu historique/mission pas encore formalisé en interne → prévoir un atelier de cadrage avec le bureau avant rédaction.
Estimation : **Story Points : 5**

#### User Story 3.2
En tant que **visiteur**
Je souhaite **voir l'organisation et les membres du bureau de TianSemi**
Afin d'**identifier les responsables et points de contact**

Critères d'acceptation :
- `/club/membres.html` présente des fiches membres du bureau (photo, rôle, lien de contact/LinkedIn optionnel).
- Structure réutilisable pour ajouter facilement de nouveaux membres.

Tâches techniques :
- Collecter photos/rôles des membres du bureau (avec consentement explicite de publication).
- Construire le composant « fiche membre » réutilisable.
- Implémenter la page.

Dépendances : US-3.1.
Risques : consentement de publication des photos non recueilli pour tous les membres → prévoir une option « sans photo » par défaut.
Estimation : **Story Points : 5**

### Epic 3.2 — Rayonnement

#### User Story 3.3
En tant qu'**étudiant ou partenaire**
Je souhaite **consulter les activités menées par TianSemi**
Afin d'**évaluer la dynamique réelle du club**

Critères d'acceptation :
- `/club/activites.html` présente les activités réelles sous forme de grille de cartes (titre, description courte, date, visuel si disponible).
- Au moins 3 activités réelles documentées au lancement.

Tâches techniques :
- Collecter la liste des activités réelles menées par le club.
- Construire le composant carte d'activité.
- Implémenter la page.

Dépendances : US-3.1.
Risques : peu d'activités déjà documentées → accepter un contenu minimal réel plutôt que d'inventer du contenu.
Estimation : **Story Points : 3**

#### User Story 3.4
En tant que **partenaire académique**
Je souhaite **connaître les évènements passés et à venir du club**
Afin d'**évaluer une éventuelle collaboration**

Critères d'acceptation :
- `/club/evenements.html` distingue évènements passés et à venir.
- Chaque évènement comporte titre, date, lieu, description courte.

Tâches techniques :
- Collecter les évènements réels (passés et planifiés).
- Implémenter la page avec un composant de type timeline ou liste chronologique.

Dépendances : US-3.1.
Risques : faible.
Estimation : **Story Points : 3**

#### User Story 3.5
En tant que **partenaire académique ou industriel potentiel**
Je souhaite **voir les partenaires actuels du club**
Afin d'**évaluer sa crédibilité institutionnelle**

Critères d'acceptation :
- `/club/partenaires.html` présente logos et noms des partenaires réels (INPHB, entreprises, autres clubs).
- Mention claire et transparente si la liste est encore en construction, plutôt que vide ou factice.

Tâches techniques :
- Confirmer la liste des partenaires réels avec autorisation explicite d'affichage du logo.
- Implémenter la page.

Dépendances : US-3.1.
Risques : autorisation d'usage des logos non obtenue → demander une validation écrite avant publication.
Estimation : **Story Points : 2**

### Epic 3.3 — Recrutement

#### User Story 3.6
En tant qu'**étudiant intéressé**
Je souhaite **un moyen clair de rejoindre TianSemi**
Afin de **m'engager dans le club**

Critères d'acceptation :
- `/club/rejoindre.html` présente les bénéfices à rejoindre le club et un CTA clair.
- Formulaire d'adhésion fonctionnel (réutilise l'intégration du Sprint 0) ou lien vers un formulaire externe si plus adapté au processus du club.
- Confirmation visuelle après soumission.

Tâches techniques :
- Définir avec le bureau le processus d'adhésion réel (formulaire interne vs externe).
- Implémenter le formulaire ou le lien vers la solution choisie.
- Tester l'envoi de bout en bout.

Dépendances : US-0.3, US-3.1.
Risques : processus d'adhésion non encore formalisé côté club → accompagner sa définition pendant ce sprint si nécessaire (légère charge PO additionnelle).
Estimation : **Story Points : 3**

## Architecture concernée
Complète l'arborescence `/club/` créée au Sprint 1 (5 pages).

## Design concerné
Introduction des composants fiche membre, carte d'activité, timeline d'évènement.

## SEO concerné
Meta description et titres par page club ; contenu riche en mots-clés pertinents pour le positionnement (« club cybersécurité INPHB »).

## Accessibilité concernée
Textes alternatifs sur logos partenaires et photos de membres ; hiérarchie de titres cohérente sur les 5 nouvelles pages.

## Sécurité concernée
Vérification du consentement explicite de publication des données personnelles (photos, rôles) des membres — bonne pratique de protection des données, même hors cadre réglementaire strict.

## Livrables
- Site vitrine du club complet (5 pages : accueil club, membres, activités, évènements, partenaires).
- Page de recrutement avec formulaire d'adhésion fonctionnel.

## Démonstration de fin de Sprint
Parcours « futur membre » complet : de l'accueil jusqu'à la soumission du formulaire d'adhésion.

## KPIs
- Nombre de demandes d'adhésion reçues après mise en ligne (à suivre post-sprint).
- 0 contenu placeholder restant sur les pages club.

## Risques
| Risque | Impact | Mitigation |
|---|---|---|
| Forte dépendance à la disponibilité du bureau du club pour fournir la matière (mission, membres, activités, partenaires) | Retard sur l'ensemble du sprint | Planifier des ateliers de collecte dès le démarrage du sprint, ne pas attendre la fin |
| Autorisations de publication (photos, logos) manquantes | Blocage de US-3.2 et US-3.5 | Demander les validations écrites en amont, prévoir des alternatives sans visuel |

## Plan de validation
- Validation du contenu par le bureau du club avant publication.
- Vérification des autorisations de publication (photos, logos).
- Test du formulaire d'adhésion de bout en bout.

## Documentation à produire
- Procédure de mise à jour des pages club (ajout d'un membre, d'une activité, d'un partenaire).
- Section « Club » ajoutée au `README.md`.

---
