# tiansemi.github.io

Static GitHub Pages site for the TianSemi portfolio, interactive quiz, and TOEIC flashcards page.

Pages:

- `index.html` - portfolio home page
- `quiz.html` - interactive quiz
- `toeic.html` - TOEIC flashcards revision tool

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
