# tiansemi.github.io

Static GitHub Pages site for the TianSemi portfolio, interactive quiz, and TOEIC flashcards page.

Pages:

- `index.html` - portfolio home page
- `quiz.html` - interactive quiz
- `toeic.html` - TOEIC flashcards revision tool

## Contact form

The contact form on `index.html` submits asynchronously to Formspree. Its public endpoint is configured directly in the form's `action` attribute; no API key is stored in this repository.

- Required fields: name, email address, and message. Phone is optional.
- Visitor feedback: the form shows sending, success, validation-error, and network-error states without leaving the page.
- End-to-end test: on 2026-06-20, a labelled technical test was accepted by Formspree (`HTTP 200`). Confirm that it arrived in `tiansemi@outlook.com` before declaring the deployment validated.
- Contingency: monitor the Formspree free-plan quota in its dashboard. If it is reached, create a Getform or EmailJS form, replace only the `action` endpoint and retest the success/error states.

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
