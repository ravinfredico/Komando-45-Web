# Deployment guide

This document contains short instructions for deploying the Flask app included in this folder. Choose one of the methods below.

Environment variables
- `FLASK_SECRET` — set to a secure secret in production
- `PORT` — some platforms set this automatically (cloud containers). Gunicorn binds to 5000 in the Dockerfile.

1) Render (recommended for simplicity)
- Create a new Web Service on Render and connect your GitHub repo.
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app --log-file -`
- Set environment variable `FLASK_SECRET` in Render's dashboard.

2) Docker (Cloud Run, Azure Container Apps, DigitalOcean App Platform)

- Build locally:

```powershell
cd "c:\Users\ravin\Komando45 Website\HTML"
docker build -t komando45:latest .
```

- Run locally:

```powershell
docker run -p 5000:5000 --env FLASK_SECRET=change-me komando45:latest
```

- Push to Docker Hub & deploy to Cloud Run / Azure / DigitalOcean (follow provider docs).

3) Azure Web App for Containers / App Service
- Push Docker image to a registry (Azure Container Registry or Docker Hub).
- Create Web App for Containers and point it to the image. Set `FLASK_SECRET` in app settings.

4) Railway / Fly / Railway
- These providers can deploy directly from Git. Create a new project, connect repo, set build `pip install -r requirements.txt`, start `gunicorn app:app` and add env vars.

5) GitHub Actions CI/CD (example)
- Use a workflow to build/push a Docker image to Docker Hub or Azure Container Registry, then trigger deployment. (I can add an example workflow if you want.)

Notes
- The contact form currently prints submissions to stdout — integrate an email provider or DB for production.
- For HTTPS, let the platform/proxy handle TLS termination (most PaaS do this automatically).
