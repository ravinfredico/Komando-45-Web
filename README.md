# Komando45 Website (Flask scaffold)

This folder contains a minimal Flask website scaffold you can run locally.

What you get
- `app.py` - main Flask app with routes for Home, About, Contact and 404 handling
- `config.py` - small config holder (SECRET_KEY)
- `templates/` - Jinja2 templates (base, index, about, contact, 404)
- `static/` - CSS and JS assets
- `requirements.txt` - pinned Flask dependency

Quick start (Windows PowerShell)

If you want to run the original Flask app (development):

1. Create and activate a virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

3. Run the app (development):

```powershell
$env:FLASK_APP = "app.py";
$env:FLASK_ENV = "development";
python app.py
```

Open http://127.0.0.1:5000

If you prefer a free, fast, animated static site (recommended):

- I converted the Flask templates into static pages in this folder: `index.html`, `about.html`, `contact.html`.
- The contact form is wired to Formspree — replace the `action` in `contact.html` with your Formspree endpoint after you sign up at https://formspree.io.
- Animations are implemented with GSAP in `static/js/main.js` (loaded from CDN in each page).

Deploying the static site (free):

1. Push this `HTML/` folder to a GitHub repository.
2. Enable GitHub Pages in the repo settings (source: `main` branch, root). GitHub will publish at `https://yourname.github.io/repo`.
3. I added a `CNAME` file (value `komando45.com`) so you can map your custom domain; follow GitHub Pages custom domain DNS instructions and add the records at your registrar.

Or use Cloudflare Pages: connect your GitHub repo to Cloudflare Pages, pick the branch, and Cloudflare will host and provide HTTPS automatically.

Notes
- The static option is free and ideal for animation-heavy sites. Form submissions will be handled by Formspree (free tier available).
- If you later need server-side features, you can redeploy the Flask app to a free-tier container host (Fly.io, Cloud Run free tier) — see `DEPLOY.md` for container instructions.

