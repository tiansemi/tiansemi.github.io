# tiansemi.github.io

Static GitHub Pages site for the TianSemi portfolio, interactive quiz, and TOEIC flashcards page.

Pages:

- `index.html` - portfolio home page
- `quiz.html` - interactive quiz
- `toeic.html` - TOEIC flashcards revision tool

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

Implemented. `toeic.html` now loads the global token file and contains no hard-coded colour values; its local variables map to the shared `--toeic-*` learning-module tokens and TianSemi brand tokens. The flashcard interaction code is unchanged. Perform a final visual pass through the revision flow after deployment.

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
