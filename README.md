# tiansemi.github.io

Static GitHub Pages site for the TianSemi portfolio, interactive quiz, and TOEIC flashcards page.

Pages:

- `index.html` - portfolio home page
- `quiz.html` - interactive quiz
- `toeic.html` - TOEIC flashcards revision tool

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

Completed locally. `robots.txt` allows crawling and references `sitemap.xml`; the sitemap lists the home page, quiz, and TOEIC pages. Each existing page has a unique meta description and canonical URL. Submitting the site to Google Search Console remains a manual step requiring access to the TianSemi Google account.

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
