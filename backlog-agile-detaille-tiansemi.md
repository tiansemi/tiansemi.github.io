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

#### User Story 3.2 [à faire]
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

#### User Story 3.4 [à faire]
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

#### User Story 3.5 [à faire]
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

# Sprint 4 — Plateforme d'Apprentissage

## Vision du Sprint
Structurer les ressources pédagogiques existantes (Quiz, TOEIC) dans une arborescence cohérente et créer les pages d'entrée des 6 filières d'apprentissage, afin d'offrir aux étudiants un vrai parcours guidé vers les compétences Réseau & Cybersécurité plutôt qu'un accès isolé à deux outils sans contexte.

## Objectifs
- Créer la page d'accueil de la plateforme d'apprentissage (`/apprentissage/index.html`).
- Créer les pages d'entrée de chaque filière (Réseaux, Cybersécurité, Linux, Programmation, Cloud/DevOps, IA).
- Intégrer le Quiz et le TOEIC dans le parcours pédagogique de façon contextuelle.
- Poser les bases d'un parcours d'apprentissage progressif (débutant → intermédiaire → avancé).
- Amorcer le contenu pédagogique concret sur au moins 2 filières prioritaires.

## Valeur Métier
Transforme deux outils isolés en une plateforme cohérente qui justifie l'ambition pédagogique du club. C'est le sprint qui différencie TianSemi de n'importe quel autre site portfolio et lui confère une raison d'être unique, en phase avec sa mission de formation.

## Epics

### Epic 4.1 — Hub d'apprentissage

#### User Story 4.1
En tant qu'**étudiant visitant le site pour la première fois**
Je souhaite **une page d'accueil de la plateforme présentant les filières disponibles**
Afin de **choisir mon parcours d'apprentissage sans me perdre**

Critères d'acceptation :
- `/apprentissage/index.html` présente les 6 filières sous forme de grille de cartes cliquables.
- Chaque carte indique : titre de la filière, icône, description courte (1 à 2 phrases), niveau recommandé (débutant/intermédiaire/avancé), et lien vers la page de filière.
- Section « Outils d'auto-évaluation » présente le Quiz et le TOEIC en contexte pédagogique.
- Page liée depuis la navigation principale et le teaser accueil (mis à jour depuis le Sprint 1).

Tâches techniques :
- Construire le gabarit de page hub.
- Créer le composant « carte de filière » réutilisable.
- Rédiger les 6 descriptions courtes de filières.
- Actualiser le teaser Apprentissage sur `index.html`.

Dépendances : US-1.3, US-1.4.
Risques : faible ; contenu rédactionnel léger (descriptions courtes).
Estimation : **Story Points : 5**

#### User Story 4.2
En tant qu'**étudiant intéressé par la cybersécurité ou les réseaux**
Je souhaite **une page d'entrée dédiée à ma filière**
Afin de **disposer d'une vue d'ensemble des ressources disponibles sur ce sujet**

Critères d'acceptation :
- Chacune des 6 pages `/apprentissage/<filiere>/index.html` est créée avec : titre, description de la filière, objectifs d'apprentissage, liste des ressources disponibles (même partielles au départ), lien vers les outils correspondants (Quiz/TOEIC si applicable).
- Les pages Réseaux et Cybersécurité (filières prioritaires du club) disposent d'un contenu plus complet que les 4 autres.
- Design cohérent avec le reste du site (tokens Sprint 1).

Tâches techniques :
- Construire le gabarit de page filière.
- Rédiger le contenu de Réseaux et Cybersécurité (objectifs, ressources initiales, prérequis).
- Créer les pages skeleton des 4 filières restantes avec un contenu minimal mais non factice.

Dépendances : US-4.1.
Risques : volume rédactionnel important si on veut 6 pages complètes → prioriser Réseaux et Cybersécurité à contenu complet, les 4 autres en contenu partiel honnête.
Estimation : **Story Points : 8**

### Epic 4.2 — Intégration pédagogique des outils existants

#### User Story 4.3
En tant qu'**étudiant**
Je souhaite **comprendre pourquoi et comment utiliser le Quiz et le TOEIC dans mon parcours**
Afin de **leur donner du sens au sein de ma progression**

Critères d'acceptation :
- La page `/apprentissage/index.html` et les pages filières concernées contextualisent le Quiz (lien entre quiz réseau/sécu et les filières correspondantes) et le TOEIC (utile pour la certification professionnelle internationale).
- Les URLs du Quiz et du TOEIC sont accessibles depuis au moins deux chemins : depuis le hub Apprentissage et depuis les pages filières concernées.
- Si les fichiers ont été déplacés (décision Sprint 1), les redirections fonctionnent correctement.

Tâches techniques :
- Ajouter des blocs contextuels (encadrés pédagogiques) sur les pages filières correspondantes, renvoyant vers les outils.
- Vérifier l'accessibilité des URLs finales de quiz/TOEIC.
- Mettre à jour les en-têtes de `quiz.html` et `toeic.html` pour inclure le fil d'Ariane Apprentissage.

Dépendances : US-4.1, décision URL sprint 1 (déplacement ou non de quiz/toeic).
Risques : faible.
Estimation : **Story Points : 3**

#### User Story 4.4
En tant qu'**étudiant utilisant le Quiz**
Je souhaite **voir à quelle filière d'apprentissage correspond chaque thème de quiz**
Afin de **relier les questions aux ressources pédagogiques correspondantes**

Critères d'acceptation :
- Le header de `quiz.html` (et de ses pages de catégories) indique la filière associée (ex. « Catégorie : Réseaux — Sprint 1 »).
- Un lien « Consulter les ressources associées » renvoie vers la page filière correspondante.

Tâches techniques :
- Modifier le header de quiz.html et les pages de catégories pour ajouter la filière et le lien retour.

Dépendances : US-4.2, US-4.3.
Risques : faible.
Estimation : **Story Points : 2**

### Epic 4.3 — Contenu pédagogique amorce

#### User Story 4.5
En tant qu'**étudiant débutant en réseaux**
Je souhaite **une première ressource concrète (fiche ou guide) sur la filière Réseaux**
Afin de **démarrer mon apprentissage sans quitter la plateforme**

Critères d'acceptation :
- Au moins une ressource pédagogique structurée est disponible sous `/apprentissage/reseaux/` (fiche récapitulative, guide des bases, ou article de blog associé).
- La ressource couvre un sujet fondamental (ex. modèles OSI/TCP-IP, adressage IP, sous-réseaux).
- Mise en forme adaptée à la lecture technique (code blocks, tableaux, schémas si pertinents).

Tâches techniques :
- Rédiger la ressource pédagogique (ou réutiliser du contenu existant produit par le club).
- Implémenter la page avec le gabarit filière.

Dépendances : US-4.2.
Risques : disponibilité d'un expert rédacteur au sein du club → impliquer un membre du club spécialiste Réseaux dès le début du sprint.
Estimation : **Story Points : 5**

#### User Story 4.6
En tant qu'**étudiant débutant en cybersécurité**
Je souhaite **une première ressource concrète sur la filière Cybersécurité**
Afin de **comprendre les bases de la sécurité informatique**

Critères d'acceptation :
- Au moins une ressource structurée sous `/apprentissage/cybersecurite/` (ex. introduction aux attaques courantes, première CTF, lexique sécurité).
- Mise en forme lisible et technique.

Tâches techniques :
- Rédiger la ressource.
- Implémenter la page.

Dépendances : US-4.2.
Risques : idem US-4.5.
Estimation : **Story Points : 5**

### Epic 4.4 — Parcours utilisateur connecté (préparation)

#### User Story 4.7
En tant que **membre du club connecté via Google**
Je souhaite **que la plateforme reconnaisse mon profil pour préparer le suivi de progression futur**
Afin de **bénéficier d'une expérience personnalisée lors de la phase d'évolution**

Critères d'acceptation :
- La page Apprentissage reconnaît si un utilisateur est connecté (via l'authentification Firebase déjà en place ou à mettre en place) et affiche son prénom dans un accueil personnalisé minimal.
- Aucune donnée de progression n'est encore persistée (User Story de suivi de progression réservée pour une phase future — cf. US-16 du backlog initial).
- La page reste pleinement fonctionnelle pour les visiteurs non connectés.

Tâches techniques :
- Intégrer un bloc conditionnel réutilisant `firebase.js` pour afficher un message personnalisé si l'utilisateur est connecté.
- Tester les deux états (connecté / non connecté).

Dépendances : authentification Firebase existante (pas de refactoring requis).
Risques : faible ; changement mineur côté JS.
Estimation : **Story Points : 2**

## Architecture concernée
Complète l'arborescence `/apprentissage/` et ses sous-dossiers créés au Sprint 1. Aucun changement structurel transverse.

## Design concerné
Composants : carte de filière, encadré pédagogique (tip/alert), bloc de code avec bouton copier, fil d'Ariane.

## SEO concerné
Chaque page filière est une URL distincte, indexable et ciblée sur des mots-clés spécifiques (« apprendre la cybersécurité », « cours réseau informatique »). Meta description et titre uniques à définir sur chaque page dès sa création.

## Accessibilité concernée
Hiérarchie de titres stricte sur toutes les pages pédagogiques ; textes alternatifs sur les schémas ; blocs de code accessibles (attribut `role="region"`, pas seulement mis en forme visuellement).

## Sécurité concernée
Vérifier que l'affichage conditionnel du prénom (US-4.7) ne fuira pas d'information sensible sur les profils connectés côté front.

## Livrables
- Page hub Apprentissage.
- 6 pages de filières.
- Quiz et TOEIC contextualisés.
- 2 premières ressources pédagogiques (Réseaux et Cybersécurité).
- Accueil personnalisé minimal pour les utilisateurs connectés.

## Démonstration de fin de Sprint
Parcours étudiant : accueil → Apprentissage → filière Réseaux → lecture de la ressource → Quiz d'auto-évaluation → retour vers la filière.

## KPIs
- Temps moyen passé sur les pages filières (objectif : > 2 minutes).
- Taux de clic vers les outils Quiz/TOEIC depuis les pages filières.
- 0 ressource factice publiée.

## Risques
| Risque | Impact | Mitigation |
|---|---|---|
| Volume de contenu pédagogique sous-estimé | Sprint trop chargé | Prioriser strictement les filières Réseaux et Cybersécurité ; les 4 autres restent en skeleton honnête |
| Disponibilité rédactrice au sein du club | Retard des US-4.5 et 4.6 | Identifier 2 membres rédacteurs dès le début du sprint, avec des templates de rédaction clairs |

## Plan de validation
- Relecture pédagogique du contenu par au moins un expert interne du club.
- Test du fil d'Ariane et des liens croisés Quiz/TOEIC.
- Test de l'affichage personnalisé connecté/non connecté.

## Documentation à produire
- Guide éditorial pour la rédaction de ressources pédagogiques (format, longueur, structure recommandée).
- Procédure d'ajout d'une nouvelle ressource pédagogique.
- Section « Apprentissage » dans `README.md`.

---

# Sprint 5 — Blog Technique

## Vision du Sprint
Créer l'infrastructure du blog technique (gabarits, système de navigation par catégorie, pages d'articles) et publier les 3 premiers articles fondateurs, qui établissent le ton et le positionnement éditorial du club.

## Objectifs
- Créer le gabarit de liste d'articles (page `/blog/`).
- Créer le gabarit d'article individuel.
- Publier 3 premiers articles de qualité couvrant au moins 2 catégories différentes.
- Mettre en place la navigation par catégorie.
- Mettre à jour le teaser Blog sur la page d'accueil avec les vrais articles.

## Valeur Métier
Le blog est le principal vecteur de référencement organique à long terme et le mécanisme de partage de connaissance qui donne au club une autorité technique visible. Trois articles bien rédigés valent plus que vingt articles mal construits — la qualité prime sur le volume au lancement.

## Epics

### Epic 5.1 — Infrastructure du blog

#### User Story 5.1
En tant que **visiteur**
Je souhaite **une page listant les articles du blog avec leur catégorie**
Afin de **trouver rapidement un article sur un sujet qui m'intéresse**

Critères d'acceptation :
- `/blog/index.html` affiche une grille de cartes d'articles (titre, catégorie, auteur, date, résumé de 2 à 3 lignes, image de couverture si disponible).
- Filtrage par catégorie fonctionnel (Réseaux, Cybersécurité, Linux, Programmation, Actualités, Retours d'expérience) — en JS vanilla pur, sans dépendance tierce.
- La liste est paginée ou limitée à 9 articles par défaut avec option « voir plus » (JS vanilla).
- Page liée depuis la navigation principale et le teaser Blog mis à jour sur l'accueil.

Tâches techniques :
- Construire le gabarit de liste.
- Implémenter le système de filtrage par catégorie en JS.
- Construire le composant carte d'article.
- Intégrer les 3 premiers articles dans la liste.
- Mettre à jour le teaser Blog sur `index.html`.

Dépendances : US-1.3, US-1.5.
Risques : si le volume d'articles dépasse 20, la gestion en HTML statique devient lourde → planifier la migration vers un générateur statique en roadmap long terme (recommandation §16 de l'audit).
Estimation : **Story Points : 8**

#### User Story 5.2
En tant que **lecteur d'un article**
Je souhaite **un gabarit d'article riche (auteur, date, durée de lecture, fil d'Ariane, articles similaires)**
Afin de **bénéficier d'une expérience de lecture professionnelle et de continuer ma navigation**

Critères d'acceptation :
- Gabarit article contient : fil d'Ariane, titre, auteur (avec lien vers son profil club ou portfolio), date de publication, durée de lecture estimée (calculée dynamiquement en JS), badge de catégorie, corps de l'article, section « Pour aller plus loin » (liens croisés), section « Articles similaires ».
- Blocs de code avec coloration syntaxique (Highlight.js via CDN, avec SRI) et bouton « copier le code ».
- La page est lisible sur mobile avec une taille de police confortable (≥ 16px, interligne ≥ 1.6).

Tâches techniques :
- Construire le gabarit article HTML.
- Intégrer Highlight.js (CDN + SRI).
- Implémenter le calcul de durée de lecture (mots / 200 WPM en JS).
- Implémenter le bouton « copier le code ».
- Définir la convention de nommage des fichiers d'articles (`/blog/<YYYY-MM-DD-slug>.html`).

Dépendances : US-5.1.
Risques : intégration Highlight.js → tester que les langages nécessaires (bash, python, C, configurations réseau) sont bien supportés.
Estimation : **Story Points : 8**

### Epic 5.2 — Premiers articles fondateurs

#### User Story 5.3
En tant qu'**étudiant débutant**
Je souhaite **lire un premier article d'introduction à la cybersécurité rédigé par TianSemi**
Afin de **comprendre les bases et les enjeux du domaine**

Critères d'acceptation :
- Article complet, structuré (introduction, sections titrées, conclusion, CTA vers la filière Cybersécurité de l'Apprentissage).
- Longueur : 800 à 1500 mots.
- Relu et validé par un expert interne avant publication.
- Meta description unique, titre optimisé SEO.

Tâches techniques :
- Rédiger l'article (ou piloter la rédaction par un expert interne).
- Produire/choisir une image de couverture libre de droits.
- Implémenter dans le gabarit article.

Dépendances : US-5.2.
Risques : disponibilité de l'auteur → impliquer l'expert dès le début du sprint, pas en fin.
Estimation : **Story Points : 3**

#### User Story 5.4
En tant que **professionnel ou étudiant avancé**
Je souhaite **lire un retour d'expérience d'une compétition CTF ou technique**
Afin de **m'inspirer et évaluer le niveau technique du club**

Critères d'acceptation :
- Article de retour d'expérience réel (CTF, hackathon, compétition).
- Décrit le challenge, la démarche, les outils utilisés, les leçons tirées.
- Longueur : 500 à 1200 mots.

Tâches techniques :
- Rédiger/piloter la rédaction : M MOULO OHOLO Jean Noel à terminé 3eme au podium mondial avec deux autres membres de l'équipe réseau lors de la phase mondiale de la Huawei ICT. Je retiens qu'il faut avoir de la maitrise, la rapidité, un fort mental.
- Implémenter dans le gabarit article.

Dépendances : US-5.2.
Risques : aucune compétition récente ou retour d'expérience disponible → choisir un autre thème technique concret (ex. tutoriel Linux, fiche outil de sécurité).
Estimation : **Story Points : 3**

#### User Story 5.5
En tant que **visiteur technique**
Je souhaite **lire un tutoriel pratique (Linux, réseau, ou outil de sécurité)**
Afin de **gagner une compétence concrète directement applicable**

Critères d'acceptation :
- Article tutoriel avec étapes numérotées, blocs de code, captures d'écran ou schémas.
- Longueur : 600 à 1500 mots.
- Testé et validé techniquement avant publication.

Tâches techniques :
- Rédiger/piloter la rédaction.
- Préparer les visuels.
- Implémenter dans le gabarit article.

Dépendances : US-5.2.
Risques : faible si le sujet est bien défini en amont.
Estimation : **Story Points : 3**

### Epic 5.3 — Navigation croisée Blog / Apprentissage

#### User Story 5.6
En tant que **lecteur d'un article de blog**
Je souhaite **des liens contextuels vers les ressources d'apprentissage correspondantes**
Afin de **prolonger ma lecture vers une formation structurée**

Critères d'acceptation :
- Chaque article contient une section « Pour aller plus loin » avec au moins un lien vers la filière d'apprentissage correspondante.
- Les pages de filières Apprentissage (Sprint 4) renvoient vers les articles de blog associés.

Tâches techniques :
- Mettre à jour les pages filières d'apprentissage (US-4.2) avec des liens vers les articles publiés.
- S'assurer que la section est bien présente dans le gabarit article.

Dépendances : US-5.2, US-4.2.
Risques : faible.
Estimation : **Story Points : 2**

## Architecture concernée
Complète l'arborescence `/blog/` créée au Sprint 1. Convention de nommage des fichiers d'articles définie et documentée.

## Design concerné
Composants : carte d'article, gabarit article complet, bloc de code avec Highlight.js, badge de catégorie, encadré « Pour aller plus loin ».

## SEO concerné
Le blog est le principal levier SEO du site à long terme. Chaque article doit dès sa création disposer d'un titre optimisé, d'une meta description unique, de balises OG et de données structurées `Article` Schema.org (à ajouter dans le gabarit article).

## Accessibilité concernée
- Blocs de code accessibles (attribut `tabindex="0"`, rôle `region`).
- Images de couverture avec textes alternatifs pertinents.
- Durée de lecture annoncée aux lecteurs d'écran (`aria-label` sur l'indicateur).

## Sécurité concernée
- SRI sur Highlight.js.
- Si des captures d'écran de terminaux ou logs sont utilisées, vérifier qu'aucune donnée sensible (IP, mot de passe, token) n'est visible.

## Livrables
- Page liste `/blog/index.html`.
- Gabarit article réutilisable.
- 3 premiers articles publiés.
- Navigation croisée Blog ↔ Apprentissage opérationnelle.

## Démonstration de fin de Sprint
Parcours : accueil → Blog → filtrage par catégorie Cybersécurité → lecture de l'article → section « Pour aller plus loin » → filière Apprentissage.

## KPIs
- Durée de lecture moyenne des articles > 90 secondes (indicateur d'engagement).
- 3 articles publiés et validés.
- 0 lien cassé entre Blog et Apprentissage.

## Risques
| Risque | Impact | Mitigation |
|---|---|---|
| Disponibilité des auteurs (étudiants bénévoles) | Articles non prêts à temps | Démarrer la rédaction dès le premier jour du sprint ; les gabarits ne sont pas un bloquant |
| Volume d'articles insuffisant à long terme | Blog peu vivant, pénalisant le SEO | Définir une charte éditoriale et un rythme cible (ex. 2 articles/mois) dès ce sprint |

## Plan de validation
- Relecture éditoriale ET technique de chaque article avant publication.
- Test multi-device du gabarit article (mobile, tablette, desktop).
- Vérification des blocs de code (coloration syntaxique, bouton copier).
- Vérification des liens croisés Blog ↔ Apprentissage.

## Documentation à produire
- Charte éditoriale du blog (ton, structure, longueur recommandée, processus de validation).
- Procédure d'ajout d'un nouvel article (nommage, métadonnées, images).
- Section « Blog » dans `README.md`.

---

# Sprint 6 — SEO, Performance & Accessibilité

## Vision du Sprint
Consolider transversalement la qualité technique du site — référencement, performance de chargement et accessibilité — sur l'ensemble de l'arborescence constituée lors des sprints précédents. Ce sprint ne produit aucune nouvelle fonctionnalité visible mais maximise la portée et la qualité perçue du site auprès des moteurs de recherche, des utilisateurs handicapés et des visiteurs à connexion lente.

## Objectifs
- Déployer les métadonnées SEO complètes (meta, OG, Twitter Cards, hreflang, Schema.org) sur toutes les pages.
- Générer et soumettre le sitemap XML complet.
- Optimiser les images (format WebP, dimensions explicites, lazy loading généralisé).
- Atteindre un score Lighthouse ≥ 90 sur les quatre axes (Performance, Accessibilité, Bonnes pratiques, SEO) pour les pages principales.
- Corriger toutes les anomalies d'accessibilité détectées lors de l'audit Lighthouse/axe-core.
- Mettre en place les en-têtes de sécurité disponibles en hébergement statique (CSP via meta).

## Valeur Métier
Chaque point gagné en SEO se traduit en trafic organique supplémentaire. Chaque correction d'accessibilité élargit le public potentiel. Ce sprint débloque l'indexation de tout le contenu créé aux sprints 2 à 5, qui sans ce travail resterait invisible sur Google.

## Epics

### Epic 6.1 — SEO complet

#### User Story 6.1
En tant que **moteur de recherche**
Je souhaite **des métadonnées complètes sur chaque page**
Afin d'**indexer correctement et afficher des résultats enrichis**

Critères d'acceptation :
- `<meta name="description">` unique et optimisée (150 à 160 caractères) sur chaque page.
- `<link rel="canonical">` présent sur chaque page.
- Open Graph (og:title, og:description, og:image, og:url, og:type) sur chaque page.
- Twitter Cards (twitter:card, twitter:title, twitter:description, twitter:image) sur chaque page.
- Image OG générique créée (`assets/images/og-cover.png`, 1200x630px), et images OG spécifiques pour les articles de blog.

Tâches techniques :
- Créer un gabarit de bloc meta réutilisable documenté.
- Appliquer ce gabarit sur les 20 à 25 pages du site (accueil, portfolio × 4, club × 5, apprentissage × 8, blog × 4+).
- Créer `og-cover.png` avec le branding TianSemi.

Dépendances : US-0.4 (fondations Sprint 0), toutes les pages créées aux sprints 1 à 5.
Risques : volume de pages important → créer un checklist par page pour ne rien oublier.
Estimation : **Story Points : 8**

#### User Story 6.2
En tant que **moteur de recherche**
Je souhaite **un sitemap XML complet et un robots.txt à jour**
Afin d'**explorer efficacement toutes les pages du site**

Critères d'acceptation :
- `sitemap.xml` mis à jour avec toutes les URLs du site (créé au Sprint 0, maintenant exhaustif).
- `robots.txt` référençant le sitemap et autorisant l'exploration complète.
- Le sitemap est soumis à Google Search Console.

Tâches techniques :
- Générer le sitemap complet (une entrée par page HTML) — manuellement ou via un script Node.js one-shot.
- Vérifier que `robots.txt` est valide (outil Google).

Dépendances : US-6.1.
Risques : sitemap pas maintenu à jour lors de l'ajout de nouveaux articles → documenter la procédure de mise à jour et l'intégrer dans le guide d'ajout d'article (Sprint 5).
Estimation : **Story Points : 3**

#### User Story 6.3
En tant que **moteur de recherche Google**
Je souhaite **des données structurées Schema.org sur les pages clés**
Afin d'**afficher des résultats enrichis (rich snippets)**

Critères d'acceptation :
- Données structurées `Person` sur la page Portfolio de M. Moulo.
- Données structurées `Organization` sur la page d'accueil Club.
- Données structurées `Article` sur chaque article de blog (titre, auteur, date de publication, image).
- Données structurées `BreadcrumbList` sur les pages profondes (articles, filières, pages portfolio).
- Validées sans erreur via l'outil de test Google Rich Results.

Tâches techniques :
- Rédiger les blocs `<script type="application/ld+json">` pour chaque type.
- Les intégrer dans les gabarits correspondants (pas en doublon sur chaque page manuelle).
- Valider via l'outil Rich Results Test de Google.

Dépendances : US-6.1.
Risques : faible.
Estimation : **Story Points : 5**

#### User Story 6.4
En tant qu'**utilisateur francophone ou anglophone**
Je souhaite **que la langue correcte soit servie par les moteurs de recherche**
Afin de **trouver le site dans ma langue dans les résultats**

Critères d'acceptation :
- Décision actée (et documentée) sur la stratégie de bilinguisme : maintien du switch JS seul (pour ce sprint) ou amorce de la migration vers `hreflang` avec URLs distinctes (à évaluer avec le PO).
- Si le switch JS est maintenu : `lang="fr"` défini par défaut sur l'attribut `html`, avec switch dynamique conservé.
- Si migration `hreflang` engagée : au moins la page d'accueil existe en version `/fr/` et `/en/` distinctes, avec les balises `<link rel="alternate" hreflang="fr">` et `<link rel="alternate" hreflang="en">` réciproques.

Tâches techniques (selon décision) :
- S'assurer que l'attribut `lang` est correctement initialisé sur chaque page (certaines peuvent avoir `lang="en"` par défaut alors que le contenu cible est majoritairement en français).
- Si migration `hreflang` : créer la structure de dossiers `/fr/`, `/en/` pour les pages prioritaires.

Dépendances : US-6.1.
Risques : migration hreflang complexe et volumineuse si engagée maintenant → recommandation : décider maintenant, exécuter partiellement sur les pages clés uniquement.
Estimation : **Story Points : 3 (switch JS) ou 8 (migration hreflang partielle)**

### Epic 6.2 — Performance

#### User Story 6.5
En tant que **visiteur avec une connexion lente (3G, Côte d'Ivoire)**
Je souhaite **que le site se charge rapidement**
Afin de **ne pas quitter la page avant qu'elle soit affichée**

Critères d'acceptation :
- LCP (Largest Contentful Paint) < 2,5 s sur connexion simulée 4G.
- CLS (Cumulative Layout Shift) < 0,1.
- Toutes les images sous la ligne de flottaison ont `loading="lazy"` et des dimensions explicites `width`/`height`.
- L'image hero (LCP) a `loading="eager"` et `fetchpriority="high"`.
- Les images PNG haute résolution sont converties au format WebP avec fallback PNG.

Tâches techniques :
- Passer en revue toutes les balises `<img>` et ajouter `width`, `height`, `loading="lazy"` là où absent.
- Convertir les images les plus lourdes en WebP (outil en ligne ou script ImageMagick).
- Utiliser `<picture>` avec source WebP + source PNG pour le fallback.

Dépendances : aucune (peut démarrer en parallèle d'autres tâches du sprint).
Risques : non-support de WebP sur très vieux navigateurs → `<picture>` avec fallback PNG couvre ce cas.
Estimation : **Story Points : 5**

#### User Story 6.6
En tant que **mainteneur**
Je souhaite **que les scripts et styles soient optimisés**
Afin de **réduire le temps de chargement sans introduire d'outil de build lourd**

Critères d'acceptation :
- CSS et JS sont minifiés pour la production (via un script npm one-shot ou un outil en ligne, sans build pipeline continu si non souhaité à ce stade).
- Taille totale des ressources CSS + JS < 100 Ko minifiées.
- Aucune dépendance inutilisée n'est chargée.

Tâches techniques :
- Analyser les CSS/JS inutilisés (DevTools Coverage).
- Minifier via `npx cssnano` et `npx terser` one-shot, ou documenter la procédure de minification.
- Vérifier les imports de `firebase.js` : si l'authentification n'est pas utilisée sur toutes les pages, ne la charger que là où elle est nécessaire.

Dépendances : aucune.
Risques : minification pouvant casser certains comportements JS → toujours tester sur l'environnement de prévisualisation avant merge.
Estimation : **Story Points : 3**

### Epic 6.3 — Accessibilité complète

#### User Story 6.7
En tant qu'**utilisateur de lecteur d'écran**
Je souhaite **naviguer sans obstacle sur l'ensemble du site**
Afin de **accéder à toutes les informations du club et de la plateforme**

Critères d'acceptation :
- Score Lighthouse Accessibilité ≥ 90 sur toutes les pages principales (accueil, blog, apprentissage, portfolio, club).
- Audit axe-core sans erreur critique.
- Ordre de tabulation logique sur toutes les pages.
- Focus visible sur tous les éléments interactifs.
- Ratios de contraste conformes WCAG 2.1 AA (≥ 4,5:1 pour le texte courant, ≥ 3:1 pour les grands textes).

Tâches techniques :
- Lancer Lighthouse et axe-core sur chaque page.
- Corriger chaque anomalie identifiée (liste à établir en début de sprint sur la base du rapport d'audit).
- Tester manuellement la navigation clavier et un lecteur d'écran (NVDA + Firefox ou VoiceOver + Safari).

Dépendances : US-1.6, toutes les pages créées aux sprints 2 à 5.
Risques : volume d'anomalies plus important que prévu → prioriser les corrections critiques et bloquer sur les erreurs WCAG AA, reporter les warnings AA en items d'amélioration continue.
Estimation : **Story Points : 8**

### Epic 6.4 — Sécurité transverse

#### User Story 6.8
En tant que **visiteur**
Je souhaite **que le site applique une politique de sécurité du contenu**
Afin d'**être protégé contre les scripts malveillants éventuels**

Critères d'acceptation :
- CSP définie via balise `<meta http-equiv="Content-Security-Policy">` sur chaque page, restreignant les scripts aux origines connues.
- Aucune erreur CSP dans la console navigateur sur les pages en production.
- SRI (`integrity=`) ajouté sur les scripts CDN tiers (ionicons, Highlight.js, Firebase).

Tâches techniques :
- Définir la politique CSP adaptée (autoriser `gstatic.com`, `unpkg.com`, `polyfill.io`, Google Fonts, etc.).
- Générer les hash SRI pour chaque script CDN et les ajouter.
- Vérifier en console l'absence d'erreur CSP.

Dépendances : aucune.
Risques : CSP trop restrictive bloquant des fonctionnalités légitimes → tester en mode `report-only` (via meta `Content-Security-Policy-Report-Only`) avant d'appliquer la politique stricte.
Estimation : **Story Points : 3**

## Architecture concernée
Aucune modification structurelle ; amélioration transverse sur toutes les pages existantes.

## Design concerné
Vérification et correction des contrastes si nécessaire sur les composants du design system.

## SEO concerné
Sprint entier dédié au SEO transverse ; priorité maximale sur US-6.1 à 6.3.

## Accessibilité concernée
Sprint entier dédié à l'accessibilité ; objectif score Lighthouse ≥ 90 sur toutes les pages.

## Sécurité concernée
CSP et SRI sur les scripts CDN tiers.

## Livrables
- Métadonnées complètes sur toutes les pages.
- `sitemap.xml` exhaustif soumis à Google Search Console.
- Images optimisées (WebP + lazy loading).
- Score Lighthouse ≥ 90 (Perf/A11y/SEO/Bonnes pratiques) sur les pages principales.
- CSP et SRI en place.

## Démonstration de fin de Sprint
Rapport Lighthouse en direct sur les 5 pages principales, montrant les scores cibles atteints.

## KPIs
- Score Lighthouse Performance ≥ 90 sur l'accueil.
- Score Lighthouse Accessibilité ≥ 90 sur toutes les pages principales.
- Score Lighthouse SEO = 100 sur toutes les pages principales.
- LCP < 2,5 s.
- 0 erreur axe-core critique.

## Risques
| Risque | Impact | Mitigation |
|---|---|---|
| Volume de pages important à auditer | Dépassement de capacité du sprint | Se concentrer sur les 5 à 8 pages les plus visitées ; reporter les pages secondaires en maintenance continue |
| Performances limitées par GitHub Pages (CDN) | LCP > 2,5 s difficile à atteindre | Optimiser d'abord ce qui est contrôlable (images, taille des assets) ; le CDN de GitHub Pages est correct pour ce contexte |

## Plan de validation
- Rapport Lighthouse automatique via CI/CD (GitHub Actions avec `lhci autorun`).
- Test manuel clavier + lecteur d'écran sur les pages clés.
- Vérification de la CSP en console navigateur.

## Documentation à produire
- Rapport Lighthouse archivé (baseline) pour référence future.
- Procédure de mise à jour du sitemap (intégrée au guide éditorial).
- Guide de bonnes pratiques d'accessibilité pour les contributeurs.

---

# Sprint 7 — Tests, Corrections & Déploiement [à faire]

## Vision du Sprint
Valider la qualité globale de la plateforme reconstituée sur l'ensemble des sprints précédents, corriger les régressions ou incohérences résiduelles, mettre en place le pipeline CI/CD pérenne, et procéder à la mise en production officielle avec une communication coordonnée.

## Objectifs
- Réaliser une recette complète cross-device et cross-browser.
- Corriger tous les bugs et régressions identifiés.
- Mettre en place le pipeline CI/CD GitHub Actions pérenne.
- Valider la cohérence éditoriale et visuelle de l'ensemble du site.
- Préparer et exécuter la communication de lancement.

## Valeur Métier
Ce sprint garantit que les investissements des 7 sprints précédents se traduisent par une expérience irréprochable pour les visiteurs réels, et qu'une infrastructure de qualité est en place pour maintenir ce niveau à long terme.

## Epics

### Epic 7.1 — Recette technique complète

#### User Story 7.1
En tant que **responsable qualité**
Je souhaite **un plan de recette cross-device et cross-browser exécuté**
Afin de **m'assurer qu'aucun visiteur ne rencontre de bug bloquant**

Critères d'acceptation :
- Recette exécutée sur : Chrome (desktop), Firefox (desktop), Safari (desktop si disponible), Chrome mobile (Android), Safari mobile (iOS si disponible).
- Recette exécutée sur les 5 pôles du site : Accueil, Portfolio, Club, Apprentissage, Blog.
- 0 bug bloquant (page blanche, navigation cassée, formulaire non fonctionnel) non résolu avant mise en production.
- Tous les liens internes et externes sont vérifiés.

Tâches techniques :
- Créer et exécuter une grille de recette (matrice pages × navigateurs × fonctionnalités clés).
- Lancer l'outil de vérification de liens (`linkinator` ou `broken-link-checker`).
- Documenter chaque anomalie et la tracer dans le backlog.
- Corriger les bugs critiques et majeurs dans ce sprint.

Dépendances : tous les sprints précédents.
Risques : volume de bugs résiduel sous-estimé → réserver 30 % de la capacité du sprint à la correction de bugs imprévus.
Estimation : **Story Points : 5**

#### User Story 7.2
En tant que **Product Owner**
Je souhaite **une validation fonctionnelle complète de tous les flux utilisateur définis dans les personas**
Afin de **m'assurer que chaque public cible trouve ce qu'il cherche**

Critères d'acceptation :
- Parcours recruteur validé (accueil → portfolio → CV → contact).
- Parcours futur membre validé (accueil → club → rejoindre → formulaire envoyé).
- Parcours étudiant validé (accueil → apprentissage → filière → ressource → quiz).
- Parcours lecteur du blog validé (accueil → blog → article → liens croisés).
- Parcours partenaire validé (accueil → club → partenaires → contact).

Tâches techniques :
- Exécuter chaque parcours utilisateur en conditions réelles (différent de la recette technique).
- Documenter les frictions et les corriger.

Dépendances : US-7.1.
Risques : faible si les sprints précédents ont été correctement validés.
Estimation : **Story Points : 3**

### Epic 7.2 — CI/CD pérenne

#### User Story 7.3
En tant que **mainteneur**
Je souhaite **un pipeline CI/CD qui valide automatiquement chaque commit sur `main`**
Afin d'**éviter toute régression non détectée lors des mises à jour futures**

Critères d'acceptation :
- `.github/workflows/deploy.yml` créé et opérationnel.
- Le pipeline inclut : validation HTML (HTMLHint), vérification de liens cassés (linkinator), rapport Lighthouse CI (bloquant si Accessibilité ou SEO < 85).
- Le déploiement GitHub Pages est déclenché automatiquement par le pipeline en cas de succès.
- Le pipeline se termine en < 5 minutes pour ne pas freiner les contributeurs.

Tâches techniques :
- Créer `.github/workflows/deploy.yml`.
- Configurer HTMLHint (`.htmlhintrc`).
- Configurer Lighthouse CI (`.lighthouserc.json`).
- Configurer linkinator.
- Tester le pipeline sur une PR de test avant déploiement en production.

Dépendances : aucune technique, mais ce pipeline ne devrait pas être la première chose déployée sur le repo actif.
Risques : pipeline trop strict bloquant des corrections urgentes → documenter la procédure de bypass temporaire (label `skip-ci`) avec règle de gouvernance.
Estimation : **Story Points : 5**

#### User Story 7.4
En tant que **contributeur**
Je souhaite **un environnement de prévisualisation pour chaque Pull Request**
Afin de **valider visuellement mes modifications avant de les fusionner**

Critères d'acceptation :
- Chaque PR génère un déploiement de prévisualisation accessible (via GitHub Pages preview ou Netlify deploy preview si intégré).
- L'URL de prévisualisation est ajoutée automatiquement en commentaire sur la PR.

Tâches techniques :
- Configurer GitHub Pages pour les branches de prévisualisation (ou intégrer Netlify Preview Deploy gratuitement).
- Tester avec une PR réelle.

Dépendances : US-7.3.
Risques : configuration plus complexe sur GitHub Pages seul (qui ne supporte nativement que `main` ou `gh-pages`) → Netlify Preview Deploy est la solution la plus simple pour ce besoin.
Estimation : **Story Points : 3**

### Epic 7.3 — Cohérence éditoriale finale

#### User Story 7.5
En tant que **visiteur**
Je souhaite **une cohérence éditoriale complète : ton, orthographe, bilingue FR/EN**
Afin de **faire confiance au professionnalisme du site**

Critères d'acceptation :
- Relecture complète de toutes les pages publiées par au moins 2 relecteurs (1 francophone, 1 anglophone si contenu EN disponible).
- 0 faute d'orthographe ou de grammaire sur les pages principales.
- Cohérence du ton (institutionnel mais accessible) sur toutes les pages.

Tâches techniques :
- Passer chaque page dans un correcteur orthographique (ex. LanguageTool CLI).
- Relecture humaine des sections clés (mission club, bio portfolio, premiers articles).

Dépendances : US-7.2.
Risques : faible.
Estimation : **Story Points : 3**

### Epic 7.4 — Communication de lancement

#### User Story 7.6
En tant que **club TianSemi**
Je souhaite **annoncer officiellement le lancement de la nouvelle plateforme**
Afin de **maximiser la visibilité initiale et recruter des membres**

Critères d'acceptation :
- Annonce coordonnée sur les réseaux sociaux du club (LinkedIn, Instagram, WhatsApp des étudiants INPHB).
- Message de lancement rédigé en FR et EN.
- Lien partageable direct vers chaque pôle (accueil, club, apprentissage, blog).

Tâches techniques :
- Rédiger les messages de lancement.
- Coordonner la publication avec le bureau du club.
- Vérifier que tous les liens partagés fonctionnent en amont de la publication.

Dépendances : US-7.1, US-7.2.
Risques : faible.
Estimation : **Story Points : 2**

## Architecture concernée
Ajout de `.github/workflows/deploy.yml` et fichiers de configuration CI/CD. Aucune modification structurelle des pages.

## Design concerné
Corrections visuelles résiduelles identifiées lors de la recette.

## SEO concerné
Vérification finale que le sitemap soumis au Sprint 6 est bien pris en compte par Google Search Console.

## Accessibilité concernée
Corrections résiduelles identifiées lors de la recette cross-browser.

## Sécurité concernée
Vérification finale que la CSP (Sprint 6) ne génère aucune erreur en console en production.

## Livrables
- Rapport de recette complet (signé par le PO).
- Pipeline CI/CD opérationnel.
- Environnement de prévisualisation PR configuré.
- Site mis en production officielle.
- Communication de lancement publiée.

## Démonstration de fin de Sprint
Démonstration en live du site complet, de bout en bout, sur un mobile et un desktop, avec l'URL de production.

## KPIs
- 0 bug critique ouvert.
- Pipeline CI/CD passant sur `main` sans erreur.
- 5 parcours utilisateur validés sans friction.
- Annonce de lancement publiée.

## Risques
| Risque | Impact | Mitigation |
|---|---|---|
| Volume de bugs résiduels dépassant la capacité du sprint | Report du lancement | Réserver 30 % de la vélocité à la correction ; décider d'un « Go/No-go » de lancement 3 jours avant la fin du sprint |
| Pipeline CI trop lent ou instable | Frein à la contribution | Optimiser le pipeline ; documenter le bypass en cas d'urgence |

## Plan de validation
- Revue formelle de fin de sprint avec le bureau du club (Go/No-go de lancement).
- Rapport de recette archivé.
- Vérification post-déploiement en production (H+1 et H+24).

## Documentation à produire
- Rapport de recette final.
- Procédure de déploiement (« comment déployer une mise à jour sur le site »).
- Guide de maintenance continue (rythme de mise à jour, responsabilités par pôle).
- Bilan de projet (rétrospective Agile finale).

---

# Product Backlog Global — Méthode MoSCoW

## MUST HAVE — Indispensable au lancement

*Ces éléments bloquent le lancement si absents. Tout site sans eux ne peut pas être considéré « prêt pour le public ».*

| ID | User Story résumée | Sprint | SP |
|---|---|---|---|
| US-0.1 | Contenu de contact réel (adresse, téléphone, e-mail) | 0 | 2 |
| US-0.2 | Suppression de `page01.html` | 0 | 1 |
| US-0.3 | Formulaire de contact fonctionnel | 0 | 3 |
| US-0.4 | `robots.txt` et meta description minimale | 0 | 2 |
| US-0.5 | Page 404 personnalisée | 0 | 1 |
| US-1.1 | Design system centralisé (tokens CSS) | 1 | 5 |
| US-1.3 | Architecture multi-pages (arborescence 4 pôles) | 1 | 5 |
| US-1.4 | Page d'accueil portail | 1 | 8 |
| US-1.5 | Navigation principale responsive | 1 | 5 |
| US-2.1 | Page Portfolio (présentation, parcours) | 2 | 5 |
| US-2.6 | Galerie de projets réels uniquement | 2 | 3 |
| US-3.1 | Page Club (histoire, mission, vision) | 3 | 5 |
| US-3.6 | Formulaire d'adhésion TianSemi | 3 | 3 |
| US-4.1 | Hub Apprentissage (6 filières listées) | 4 | 5 |
| US-5.1 | Page liste Blog | 5 | 8 |
| US-5.2 | Gabarit article blog | 5 | 8 |
| US-5.3 | Premier article (cybersécurité) | 5 | 3 |
| US-6.7 | Accessibilité complète (score ≥ 90) | 6 | 8 |
| US-7.1 | Recette cross-device / cross-browser | 7 | 5 |
| US-7.3 | Pipeline CI/CD | 7 | 5 |

**Total MUST HAVE : 89 SP**

---

## SHOULD HAVE — Important, non bloquant

*Ces éléments apportent une forte valeur métier et doivent être livrés rapidement après le lancement.*

| ID | User Story résumée | Sprint | SP |
|---|---|---|---|
| US-0.6 | Licence + CONTRIBUTING.md | 0 | 2 |
| US-1.2 | Harmonisation design toeic.html | 1 | 3 |
| US-1.6 | Accessibilité du header (aria-expanded, labels) | 1 | 3 |
| US-2.2 | Page Compétences portfolio | 2 | 3 |
| US-2.3 | Page Certifications portfolio | 2 | 2 |
| US-2.4 | CV téléchargeable | 2 | 1 |
| US-2.5 | Formulaire contact dédié portfolio | 2 | 2 |
| US-3.2 | Page Membres du bureau | 3 | 5 |
| US-3.3 | Page Activités du club | 3 | 3 |
| US-3.4 | Page Évènements | 3 | 3 |
| US-3.5 | Page Partenaires | 3 | 2 |
| US-4.2 | Pages de filières Apprentissage (6 pages) | 4 | 8 |
| US-4.3 | Quiz et TOEIC contextualisés | 4 | 3 |
| US-4.5 | Ressource pédagogique Réseaux | 4 | 5 |
| US-4.6 | Ressource pédagogique Cybersécurité | 4 | 5 |
| US-5.4 | Article blog — Retour d'expérience CTF | 5 | 3 |
| US-5.5 | Article blog — Tutoriel pratique | 5 | 3 |
| US-5.6 | Navigation croisée Blog ↔ Apprentissage | 5 | 2 |
| US-6.1 | Métadonnées SEO complètes (toutes pages) | 6 | 8 |
| US-6.2 | Sitemap XML complet | 6 | 3 |
| US-6.3 | Données structurées Schema.org | 6 | 5 |
| US-6.5 | Optimisation images (WebP, lazy loading, dimensions) | 6 | 5 |
| US-7.2 | Validation fonctionnelle des parcours utilisateur | 7 | 3 |
| US-7.5 | Cohérence éditoriale finale | 7 | 3 |
| US-7.6 | Communication de lancement | 7 | 2 |

**Total SHOULD HAVE : 87 SP**

---

## COULD HAVE — Optionnel, fort potentiel

*Ces éléments améliorent sensiblement l'expérience ou le référencement mais ne bloquent pas la valeur essentielle.*

| ID | User Story résumée | Sprint | SP estimés |
|---|---|---|---|
| US-0.7 | Dependabot / alertes sécurité GitHub | 0 | 1 |
| US-4.4 | Catégorisation thématique des quiz par filière | 4 | 2 |
| US-4.7 | Accueil personnalisé pour utilisateurs connectés | 4 | 2 |
| US-6.4 | Stratégie bilinguisme hreflang (décision + implémentation partielle) | 6 | 3 à 8 |
| US-6.6 | Minification CSS/JS | 6 | 3 |
| US-6.8 | CSP via meta + SRI sur scripts tiers | 6 | 3 |
| US-7.4 | Environnement de prévisualisation PR | 7 | 3 |
| — | Section « Compétitions / CTF » dans le club | Post-lancement | 8 |
| — | Analytics respectueuse de la vie privée (Plausible ou Firebase Analytics) | Post-lancement | 3 |
| — | Moteur de recherche interne sur le blog | Post-lancement | 8 |
| — | Mode impression CSS pour articles de blog | Post-lancement | 2 |
| — | Partage réseaux sociaux natif sur les articles | Post-lancement | 3 |

**Total COULD HAVE estimé : 47 à 52 SP**

---

## WON'T HAVE (pour le moment) — Reporté

*Ces éléments ont une valeur réelle mais leur complexité ou leur dépendance à des prérequis non encore matures les rend prématurés.*

| Fonctionnalité | Raison du report | Horizon cible |
|---|---|---|
| Espace membre avec suivi de progression (tableaux de bord quiz/TOEIC) | Nécessite une conception UX approfondie de l'expérience membre + backend ou Firebase Storage structuré | Phase 2 (post-lancement) |
| Migration vers un générateur statique (Eleventy, Astro, Jekyll) | Pertinent uniquement lorsque > 30 articles ou > 100 ressources pédagogiques rendent la maintenance HTML manuelle ingérable | Phase 2 ou 3 |
| Application mobile PWA ou native | Complexité élevée, non justifiée avant validation de l'usage mobile du site web | Phase 3 |
| Système de commentaires sur les articles de blog | Modération à gérer, RGPD à considérer, faible priorité avant audience établie | Phase 2 |
| Forum / espace de discussion interne | Nécessite un backend ou un service tiers (Discourse, GitHub Discussions) ; non prioritaire avant base d'audience | Phase 3 |
| Marketplace de ressources (vente de formations) | Hors mission actuelle du club (formation bénévole) | Évaluation long terme |
| Chatbot d'aide à l'apprentissage | Complexité IA + coûts d'inférence non compatibles avec un hébergement gratuit GitHub Pages | Phase 3+ |

---

# Roadmap Agile Complète

## Vue chronologique

```
SEMAINES     1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
             |___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
Sprint 0     [=====]
Sprint 1             [=========]
Sprint 2                         [=========]
Sprint 3                                     [=========]
Sprint 4                                                 [=========]
Sprint 5                                                             [===]
Sprint 6     ·············································[=========]
Sprint 7                                                                 [=]
Lancement    ·····················································→ Semaine 16
```

*Sprints 5 et 6 peuvent être partiellement parallélisés si l'équipe a 2 développeurs disponibles simultanément (l'un finalise Blog pendant que l'autre démarre SEO/Perf).*

---

## Fiche détaillée par sprint

### Sprint 0 — Stabilisation critique
| Élément | Détail |
|---|---|
| **Durée** | 1 semaine (urgence) |
| **Objectifs** | Éliminer le contenu factice, rendre le formulaire fonctionnel, fondations gouvernance |
| **Dépendances** | Collecte d'informations réelles auprès du bureau du club (bloquant) |
| **Vélocité cible** | 12 SP |
| **Livrables** | Formulaire fonctionnel, `robots.txt`, `404.html`, `LICENSE`, `CONTRIBUTING.md`, contenu de contact réel |
| **Risques** | Informations réelles non fournies à temps |
| **Critères de réussite** | 0 contenu factice restant, formulaire testé de bout en bout, `page01.html` supprimé |

### Sprint 1 — Architecture & Design System
| Élément | Détail |
|---|---|
| **Durée** | 2 semaines |
| **Objectifs** | Architecture multi-pages, design system, accueil portail, navigation |
| **Dépendances** | Aucune technique externe ; décision produit sur URLs quiz/TOEIC avant démarrage |
| **Vélocité cible** | 26 SP — sprint chargé, prévoir 3 semaines si vélocité équipe < 22 SP |
| **Livrables** | `tokens.css`, arborescence 4 pôles, accueil portail, navigation globale |
| **Risques** | Rupture des URLs de quiz/TOEIC ; désynchronisation navigation sans templating |
| **Critères de réussite** | 0 lien cassé, score Lighthouse Accessibilité header ≥ 90, navigation cohérente multi-pages |

### Sprint 2 — Portfolio Professionnel
| Élément | Détail |
|---|---|
| **Durée** | 2 semaines |
| **Objectifs** | Pages portfolio complètes, projets réels, CV téléchargeable |
| **Dépendances** | Sprint 1 terminé ; contenu fourni par M. Moulo (bio, CV PDF, certifications, projets réels) |
| **Vélocité cible** | 16 SP |
| **Livrables** | `/portfolio/` complet (5 pages), galerie projets assainie |
| **Risques** | Contenu non fourni à temps par M. Moulo |
| **Critères de réussite** | 0 contenu fictif, CV téléchargeable, formulaire contact dédié testé |

### Sprint 3 — Site Vitrine Club
| Élément | Détail |
|---|---|
| **Durée** | 2 semaines |
| **Objectifs** | Présence officielle TianSemi complète (5 pages), formulaire adhésion |
| **Dépendances** | Sprint 1 terminé ; matière club fournie par le bureau (mission, membres, activités, partenaires) |
| **Vélocité cible** | 21 SP |
| **Livrables** | `/club/` complet (5 pages) + page rejoindre |
| **Risques** | Forte dépendance à la disponibilité du bureau du club |
| **Critères de réussite** | Pages validées par le bureau, formulaire adhésion testé, autorisations photos/logos obtenues |

### Sprint 4 — Plateforme d'Apprentissage
| Élément | Détail |
|---|---|
| **Durée** | 2 semaines |
| **Objectifs** | Hub apprentissage, 6 pages filières, ressources pédagogiques amorce, intégration quiz/TOEIC |
| **Dépendances** | Sprint 1 terminé ; Sprint 4 peut démarrer en parallèle de Sprint 3 si 2 équipes disponibles |
| **Vélocité cible** | 30 SP — sprint le plus chargé ; prévoir 3 semaines si nécessaire |
| **Livrables** | `/apprentissage/` complet, 2 ressources pédagogiques publiées |
| **Risques** | Volume rédactionnel sous-estimé ; disponibilité des experts rédacteurs |
| **Critères de réussite** | 6 pages filières publiées, quiz/TOEIC contextualisés, ressources validées pédagogiquement |

### Sprint 5 — Blog Technique
| Élément | Détail |
|---|---|
| **Durée** | 2 semaines |
| **Objectifs** | Infrastructure blog, gabarit article, 3 premiers articles publiés |
| **Dépendances** | Sprint 1 terminé ; contenu rédigé par membres du club en amont |
| **Vélocité cible** | 30 SP — sprint chargé ; paralléliser avec Sprint 6 si possible |
| **Livrables** | `/blog/` opérationnel, 3 articles publiés, charte éditoriale |
| **Risques** | Disponibilité des auteurs ; volume de contenu insuffisant |
| **Critères de réussite** | 3 articles publiés et validés, navigation croisée blog ↔ apprentissage opérationnelle |

### Sprint 6 — SEO, Performance & Accessibilité
| Élément | Détail |
|---|---|
| **Durée** | 2 semaines |
| **Objectifs** | Métadonnées complètes, sitemap, optimisation images, accessibilité WCAG 2.1 AA, sécurité CSP |
| **Dépendances** | Toutes les pages des sprints 1 à 5 finalisées |
| **Vélocité cible** | 43 SP — ce sprint est dense et transverse ; peut être étalé sur 3 semaines ou démarré partiellement en parallèle du Sprint 5 |
| **Livrables** | Toutes les pages avec SEO complet, score Lighthouse ≥ 90, sitemap soumis |
| **Risques** | Volume d'anomalies accessibilité plus important que prévu |
| **Critères de réussite** | Lighthouse ≥ 90 sur 4 axes, 0 erreur axe-core critique, sitemap soumis à Search Console |

### Sprint 7 — Tests, Corrections & Déploiement
| Élément | Détail |
|---|---|
| **Durée** | 1 semaine (recette + go-live) |
| **Objectifs** | Recette complète, CI/CD pérenne, mise en production, communication de lancement |
| **Dépendances** | Sprint 6 terminé ; tous les parcours utilisateur validés |
| **Vélocité cible** | 21 SP |
| **Livrables** | Rapport de recette, pipeline CI/CD, annonce de lancement publiée |
| **Risques** | Bugs résiduels dépassant la capacité de correction dans le sprint |
| **Critères de réussite** | 0 bug critique, CI/CD passant, 5 parcours utilisateur validés, annonce publiée |

---

# Tableau Récapitulatif Global

| Sprint | Epic | User Story | Description courte | Priorité | SP | Dépendances | Livrable |
|---|---|---|---|---|---|---|---|
| 0 | 0.1 | US-0.1 | Contenu de contact réel | MUST | 2 | Collecte infos club | Coordonnées réelles |
| 0 | 0.1 | US-0.2 | Suppression page01.html | MUST | 1 | Aucune | Page orpheline supprimée |
| 0 | 0.2 | US-0.3 | Formulaire de contact fonctionnel | MUST | 3 | US-0.1 | Formulaire Formspree actif |
| 0 | 0.3 | US-0.4 | robots.txt + meta description | MUST | 2 | Aucune | robots.txt + meta sur 3 pages |
| 0 | 0.3 | US-0.5 | Page 404 personnalisée | MUST | 1 | Aucune | 404.html déployé |
| 0 | 0.4 | US-0.6 | Licence + CONTRIBUTING.md | COULD | 2 | Aucune | LICENSE, CONTRIBUTING.md |
| 0 | 0.4 | US-0.7 | Dependabot activé | COULD | 1 | Aucune | Alertes GitHub actives |
| 1 | 1.1 | US-1.1 | Design system (tokens CSS) | MUST | 5 | Aucune | tokens.css + guide |
| 1 | 1.1 | US-1.2 | Harmonisation toeic.html | SHOULD | 3 | US-1.1 | toeic.html aligné design system |
| 1 | 1.2 | US-1.3 | Architecture multi-pages | MUST | 5 | US-1.1 | Arborescence 4 pôles |
| 1 | 1.2 | US-1.4 | Page accueil portail | MUST | 8 | US-1.1, US-1.3 | index.html refondu |
| 1 | 1.2 | US-1.5 | Navigation globale responsive | MUST | 5 | US-1.3 | Nav cohérente sur tout le site |
| 1 | 1.3 | US-1.6 | Accessibilité header et nav | SHOULD | 3 | Aucune | Header accessible |
| 2 | 2.1 | US-2.1 | Page Portfolio présentation | MUST | 5 | US-1.3, US-1.5 | /portfolio/index.html |
| 2 | 2.1 | US-2.2 | Page Compétences portfolio | SHOULD | 3 | US-2.1 | /portfolio/competences.html |
| 2 | 2.1 | US-2.3 | Page Certifications portfolio | SHOULD | 2 | US-2.1 | /portfolio/certifications.html |
| 2 | 2.1 | US-2.4 | CV téléchargeable | SHOULD | 1 | US-2.1 | PDF téléchargeable |
| 2 | 2.1 | US-2.5 | Contact dédié portfolio | SHOULD | 2 | US-0.3, US-2.1 | Formulaire contact portfolio |
| 2 | 2.2 | US-2.6 | Galerie projets réels | MUST | 3 | US-2.1 | Cartes projets réels |
| 3 | 3.1 | US-3.1 | Page Club (mission, vision) | MUST | 5 | US-1.3, US-1.4 | /club/index.html |
| 3 | 3.1 | US-3.2 | Page Membres du bureau | SHOULD | 5 | US-3.1 | /club/membres.html |
| 3 | 3.2 | US-3.3 | Page Activités | SHOULD | 3 | US-3.1 | /club/activites.html |
| 3 | 3.2 | US-3.4 | Page Évènements | SHOULD | 3 | US-3.1 | /club/evenements.html |
| 3 | 3.2 | US-3.5 | Page Partenaires | SHOULD | 2 | US-3.1 | /club/partenaires.html |
| 3 | 3.3 | US-3.6 | Formulaire adhésion | MUST | 3 | US-0.3, US-3.1 | /club/rejoindre.html |
| 4 | 4.1 | US-4.1 | Hub Apprentissage (6 filières) | MUST | 5 | US-1.3, US-1.4 | /apprentissage/index.html |
| 4 | 4.1 | US-4.2 | Pages filières (×6) | SHOULD | 8 | US-4.1 | 6 pages /apprentissage/<filiere>/ |
| 4 | 4.2 | US-4.3 | Quiz et TOEIC contextualisés | SHOULD | 3 | US-4.1, décision URLs S1 | Liens contextuels + fil Ariane |
| 4 | 4.2 | US-4.4 | Quiz catégorisé par filière | COULD | 2 | US-4.2, US-4.3 | Quiz relié à filières |
| 4 | 4.3 | US-4.5 | Ressource pédagogique Réseaux | SHOULD | 5 | US-4.2 | 1 fiche /apprentissage/reseaux/ |
| 4 | 4.3 | US-4.6 | Ressource pédagogique Cybersécurité | SHOULD | 5 | US-4.2 | 1 fiche /apprentissage/cybersecurite/ |
| 4 | 4.4 | US-4.7 | Accueil personnalisé connecté | COULD | 2 | Firebase existant | Message personnalisé si connecté |
| 5 | 5.1 | US-5.1 | Page liste Blog | MUST | 8 | US-1.3, US-1.5 | /blog/index.html |
| 5 | 5.1 | US-5.2 | Gabarit article blog | MUST | 8 | US-5.1 | Gabarit réutilisable |
| 5 | 5.2 | US-5.3 | Article — Intro cybersécurité | MUST | 3 | US-5.2 | 1er article publié |
| 5 | 5.2 | US-5.4 | Article — Retour d'expérience CTF | SHOULD | 3 | US-5.2 | 2e article publié |
| 5 | 5.2 | US-5.5 | Article — Tutoriel pratique | SHOULD | 3 | US-5.2 | 3e article publié |
| 5 | 5.3 | US-5.6 | Navigation croisée Blog ↔ Apprentissage | SHOULD | 2 | US-5.2, US-4.2 | Liens croisés opérationnels |
| 6 | 6.1 | US-6.1 | Métadonnées SEO complètes | SHOULD | 8 | Toutes pages | OG/TC/canonical sur toutes pages |
| 6 | 6.1 | US-6.2 | Sitemap XML complet | SHOULD | 3 | US-6.1 | sitemap.xml soumis GSC |
| 6 | 6.1 | US-6.3 | Schema.org (Person/Org/Article) | SHOULD | 5 | US-6.1 | Rich snippets validés |
| 6 | 6.1 | US-6.4 | Stratégie bilinguisme hreflang | COULD | 3 à 8 | US-6.1 | Décision + implémentation partielle |
| 6 | 6.2 | US-6.5 | Optimisation images (WebP, lazy) | SHOULD | 5 | Aucune | LCP < 2,5 s |
| 6 | 6.2 | US-6.6 | Minification CSS/JS | COULD | 3 | Aucune | Assets < 100 Ko minifiés |
| 6 | 6.3 | US-6.7 | Accessibilité complète (WCAG 2.1 AA) | MUST | 8 | Toutes pages | Score Lighthouse A11y ≥ 90 |
| 6 | 6.4 | US-6.8 | CSP meta + SRI scripts tiers | COULD | 3 | Aucune | CSP active, 0 erreur console |
| 7 | 7.1 | US-7.1 | Recette cross-device / cross-browser | MUST | 5 | Tous sprints | Rapport de recette signé |
| 7 | 7.1 | US-7.2 | Validation parcours utilisateurs | SHOULD | 3 | US-7.1 | 5 parcours validés |
| 7 | 7.2 | US-7.3 | Pipeline CI/CD GitHub Actions | MUST | 5 | Aucune | deploy.yml opérationnel |
| 7 | 7.2 | US-7.4 | Prévisualisation PR | COULD | 3 | US-7.3 | Preview automatique par PR |
| 7 | 7.3 | US-7.5 | Cohérence éditoriale finale | SHOULD | 3 | US-7.2 | 0 faute, ton cohérent |
| 7 | 7.4 | US-7.6 | Communication de lancement | SHOULD | 2 | US-7.1 | Annonce publiée |

---

## Synthèse de la charge totale

| Sprint | SP MUST | SP SHOULD | SP COULD | SP Total | Durée recommandée |
|---|---|---|---|---|---|
| Sprint 0 | 9 | 0 | 3 | 12 | 1 semaine |
| Sprint 1 | 23 | 6 | 0 | 26+* | 2 à 3 semaines |
| Sprint 2 | 8 | 8 | 0 | 16 | 2 semaines |
| Sprint 3 | 8 | 13 | 0 | 21 | 2 semaines |
| Sprint 4 | 5 | 21 | 4 | 30 | 2 à 3 semaines |
| Sprint 5 | 19 | 8 | 0 | 27* | 2 semaines (parall. S6) |
| Sprint 6 | 8 | 21 | 14 | 43* | 2 à 3 semaines |
| Sprint 7 | 10 | 8 | 3 | 21 | 1 semaine |
| **TOTAL** | **90** | **85** | **24** | **196** | **~16 à 20 semaines** |

*\* Sprints dense — calibrer avec la vélocité réelle de l'équipe bénévole ; les éléments COULD sont à retirer en premier si la capacité manque.*

---

## Note finale — Principes de gouvernance Agile pour TianSemi

1. **Revue de sprint systématique** : chaque sprint se termine par une démo live (même brève) et une rétrospective de 30 minutes. Ne pas sauter ces rituels même sous pression — ils sont le principal mécanisme de détection des dérives.

2. **"Definition of Done" partagée** : toute User Story non conforme à la DoD transverse définie en introduction de ce document reste ouverte, même en fin de sprint. Mieux vaut 4 Stories terminées proprement que 8 Stories « à 90 % ».

3. **Un Product Backlog vivant** : ce document est le point de départ, pas la vérité définitive. Le PO doit revoir et re-prioriser le backlog à chaque sprint sur la base des retours utilisateurs réels (membres du club, visiteurs, résultats Google Search Console).

4. **Documenter en continu** : chaque sprint livre sa propre documentation (procédures, guides, changelogs) — ne pas remettre à plus tard. Un site sans documentation de maintenance est un site orphelin dès le premier départ d'un contributeur.

5. **Mesurer, pas supposer** : mettre en place Plausible Analytics ou Firebase Analytics dès le Sprint 7 pour décider du Sprint 8 et au-delà sur des données réelles (pages les plus visitées, taux de rebond, sources de trafic) plutôt que sur des intuitions.

---

*Backlog Agile détaillé produit dans le cadre du rapport de transformation digitale TianSemi — version 1.0.*
*À réviser à chaque fin de sprint par le Product Owner.*