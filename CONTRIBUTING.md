# Contribuer à TianSemi

Merci de contribuer aux outils et ressources du TianSemi Club. Ce dépôt est régi par la [TianSemi Club Internal Use License](LICENSE) : seules les personnes reconnues comme membres actifs par le bureau du club peuvent copier, modifier ou contribuer au code sans autorisation écrite supplémentaire.

## Avant de commencer

- Vérifiez qu'une issue ou qu'une discussion avec le bureau couvre le besoin.
- Ne partagez ni clés API, ni mots de passe, ni données personnelles dans le dépôt.
- Les demandes de permission pour des personnes externes doivent être envoyées à `tiansemi@outlook.com`.

## Processus de contribution

1. Créez une branche à partir de `main` : `feature/nom-court`, `fix/nom-court` ou `docs/nom-court`.
2. Réalisez une modification ciblée et testez-la localement.
3. Ouvrez une pull request vers `main` en décrivant le besoin, les changements et les vérifications réalisées.
4. Attendez la revue et l'approbation d'au moins un mainteneur désigné par le bureau avant toute fusion. Ne poussez pas directement sur `main`.

## Convention de commits

Utilisez des messages courts suivant cette forme :

```text
type: description concise à l'impératif
```

Types autorisés : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

Exemples :

```text
feat: add TOEIC revision progress
fix: validate international phone numbers
docs: clarify contribution process
```

## Vérifications locales

Pour tester le site statique :

```powershell
python -m http.server 8000
```

Puis ouvrez `http://localhost:8000`. Vérifiez au minimum les pages modifiées, les liens ajoutés et le comportement mobile. Ne déclenchez pas de test Formspree réel sans accord du mainteneur responsable de la boîte de réception.

## Signalement de vulnérabilités

Ne publiez pas une vulnérabilité exploitable dans une issue publique. Envoyez une description, les étapes de reproduction et l'impact estimé à `tiansemi@outlook.com` avec l'objet `SECURITY — TianSemi`.
