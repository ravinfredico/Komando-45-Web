from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory, Response
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)

# Resolve the directory that contains the static site files (index.html). Projects
# in this workspace sometimes place the built site inside a nested `HTML/` folder.
# We prefer a deterministic static root so send_from_directory can find files.
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_ROOT = BASE_DIR
if not os.path.isfile(os.path.join(STATIC_ROOT, 'index.html')):
    alt = os.path.join(BASE_DIR, 'HTML')
    if os.path.isdir(alt) and os.path.isfile(os.path.join(alt, 'index.html')):
        STATIC_ROOT = alt
    else:
        # fallback to templates directory if index exists there
        tpl_idx = os.path.join(BASE_DIR, 'templates', 'index.html')
        if os.path.isfile(tpl_idx):
            STATIC_ROOT = os.path.join(BASE_DIR, 'templates')

print('[app] STATIC_ROOT =', STATIC_ROOT)


@app.route('/')
def index():
    # Serve the static index.html so the Flask server matches the static site served on port 8000
    return send_from_directory(STATIC_ROOT, 'index.html')


@app.route('/about')
def about():
    return send_from_directory(STATIC_ROOT, 'about.html')


@app.route('/events')
def events():
    return send_from_directory(STATIC_ROOT, 'events.html')


@app.route('/contact', methods=['GET'])
def contact():
    # The contact form in the static site posts to Formspree directly.
    # Serve the static contact.html so Flask's output matches the static server.
    return send_from_directory(STATIC_ROOT, 'contact.html')


@app.errorhandler(404)
def page_not_found(e):
    # 404.html lives in the `templates/` folder in this project; serve that file directly if present
    templates_dir = os.path.join(app.root_path, 'templates')
    tpl_path = os.path.join(templates_dir, '404.html')
    if os.path.isfile(tpl_path):
        return send_from_directory(templates_dir, '404.html'), 404
    return "404 Not Found", 404


# Serve files by filename (so requests like /about.html or /static/js/main.js work like a static server)
@app.route('/<path:filename>')
def serve_file(filename):
    # Allow only common static extensions to avoid exposing sensitive files
    allowed_ext = ('.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico', '.json')
    # Normalize path to avoid directory traversal
    safe_path = os.path.normpath(filename)
    if '..' in safe_path.split(os.path.sep):
        return "Not allowed", 403

    # Check project root
    # Try the dynamic STATIC_ROOT first
    candidate = os.path.join(STATIC_ROOT, safe_path)
    if os.path.isfile(candidate) and filename.lower().endswith(allowed_ext):
        return send_from_directory(STATIC_ROOT, safe_path)

    # Also allow files from the project root (for developer convenience)
    candidate2 = os.path.join(BASE_DIR, safe_path)
    if os.path.isfile(candidate2) and filename.lower().endswith(allowed_ext):
        return send_from_directory(BASE_DIR, safe_path)

    # If a requested image under static/images is missing, return a small SVG placeholder
    # This avoids 404s when templates reference images that haven't been added to `static/images/` yet.
    if safe_path.startswith(os.path.join('static', 'images')):
        # Simple generated SVG placeholder with theme colors
        svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="100%" height="100%" fill="#2a1818"/>
  <text x="50%" y="50%" fill="#e6c177" font-family="Arial, Helvetica, sans-serif" font-size="48" dominant-baseline="middle" text-anchor="middle">Image not found</text>
</svg>'''
        return Response(svg, mimetype='image/svg+xml')

    # Check templates folder
    tpl_candidate = os.path.join(app.root_path, 'templates', safe_path)
    if os.path.isfile(tpl_candidate) and filename.lower().endswith(allowed_ext):
        return send_from_directory(os.path.join(app.root_path, 'templates'), safe_path)

    # Let Flask handle as 404
    return page_not_found(None)


if __name__ == '__main__':
    # Run on 0.0.0.0 so the server is reachable from other devices on the network if needed.
    # Use port 5000 (default) so Flask matches typical behavior; change PORT env var if you prefer.
    app.run(host='0.0.0.0', port=5000, debug=True)
