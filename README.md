# Komando'45 Website

Static-first site for Komando'45 with a thin Flask wrapper for local development and container deployments. Pages live in the templates folder and use Bootstrap 5, custom CSS, and GSAP-driven motion.

## What's here
- [app.py](app.py) — lightweight server that serves the static HTML from the templates folder and guards static assets.
- [templates/](templates/) — the marketing pages (home, about, events, blog placeholder, thank-you, contact, 404).
- [static/css/style.css](static/css/style.css) and [static/js/main.js](static/js/main.js) — theme, animations, preloader, scroll indicator, overlay helpers.
- [Dockerfile](Dockerfile) + [Procfile](Procfile) — gunicorn entrypoints for container/PaaS hosting; [CNAME](CNAME) reserves the komando45.com mapping.

## Prerequisites
- Python 3.10+ and pip if running directly.
- Docker (optional) if you prefer to containerize.

## Local development (Flask)
1) (Optional) create a virtual environment.
2) Install dependencies (a requirements file is not committed, so install directly):

```bash
python -m pip install --upgrade pip
python -m pip install "Flask>=2.3" "gunicorn>=21"
```

3) Run the server:

```bash
python app.py
# or: flask --app app run --debug
```

The site will be served on http://127.0.0.1:5000. Set `FLASK_SECRET` for production; `PORT` can override the default when deploying.

## Static hosting
The templates are already standalone HTML files that reference `/static/...` assets. For GitHub Pages or any static host:
- Copy the HTML files from [templates/](templates/) to the hosting root (or add a small build step that does this).
- Deploy the [static/](static/) directory alongside them.
- Keep [CNAME](CNAME) if you want the komando45.com mapping.

## Container build and run
If you want to build the Docker image, ensure a requirements file exists first (Dockerfile expects it). Example minimal contents:

```bash
cat > requirements.txt <<'EOF'
Flask>=2.3
gunicorn>=21
EOF

docker build -t komando45 .
docker run -p 5000:5000 -e FLASK_SECRET=change-me komando45
```

The default command in [Dockerfile](Dockerfile) runs `gunicorn app:app -b 0.0.0.0:5000`.

## Contact form
[templates/contact.html](templates/contact.html) submits to Formspree at `https://formspree.io/f/mvglzogr`. Replace the `action` with your own Formspree endpoint and adjust the `_next` URL if you change the thank-you page route.

## Useful notes
- Animations and the preloader live in [static/js/main.js](static/js/main.js); disable GSAP blocks there if you need a lighter page.
- Theme variables (colors, typography) are near the top of [static/css/style.css](static/css/style.css).

