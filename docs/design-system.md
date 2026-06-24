# Design system TianSemi

Les tokens sont définis dans [`assets/css/tokens.css`](../assets/css/tokens.css). Toute nouvelle page doit charger `assets/css/style.css`, qui importe automatiquement ces tokens.

## Couleurs

| Usage | Token |
| --- | --- |
| Fond principal | `--color-bg` |
| Surface / carte | `--color-surface` |
| Texte principal | `--color-text` |
| Texte secondaire | `--color-text-muted` |
| Marque | `--color-brand-primary` |
| Accent réseau / cybersécurité | `--color-accent` |
| Appel à l’action | `--color-cta` |
| Succès / avertissement / erreur | `--color-success`, `--color-warning`, `--color-danger` |

Les variantes claires sont également disponibles avec le suffixe `-light`. Les alias historiques (`--raw-seinna`, `--ff-poppins`, etc.) sont conservés uniquement pour maintenir les composants existants ; ne les utilisez pas dans les nouvelles pages.

## Typographie et espacement

- Titres d’impact : `--font-display`
- Titres : `--font-heading`
- Texte courant : `--font-body`
- Espacement : `--space-1` à `--space-6`, sur une échelle de 8 px.

## Composants existants

- Boutons : `.btn`, `.btn-primary`, `.btn-secondary`
- Cartes et surfaces : utiliser `--color-surface`, `--color-border` et `--shadow-1`
- Alertes : utiliser les tokens d’état, jamais une couleur codée en dur.

Avant de fusionner une évolution visuelle, vérifiez les thèmes clair et sombre, le contraste du texte et l’affichage mobile.

## Module TOEIC

Les tokens préfixés `--toeic-` préservent la palette historique des flashcards (surfaces, dégradés, ombres et états translucides) tout en évitant toute couleur codée directement dans `apprentissage/toeic/index.html`. Le module utilise aussi les tokens de marque `--color-brand-primary`, `--color-brand-primary-dark`, `--color-cta` et `--color-success`.
