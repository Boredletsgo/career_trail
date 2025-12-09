# routes/__init__.py

from .auth import auth_bp
from .career import career_bp
from .skills import skills_bp


def register_routes(app):


    # Add prefixes here to maintain clear API structure
    app.register_blueprint(auth_bp, url_prefix="auth")
    app.register_blueprint(career_bp, url_prefix="/api/career")
    app.register_blueprint(skills_bp, url_prefix="/api")
