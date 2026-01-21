import os


class Config:
    # Use environment variable if available, otherwise a default for dev
    SECRET_KEY = os.environ.get('FLASK_SECRET', 'dev-secret-key')
