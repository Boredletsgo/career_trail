
from flask import Flask
from flask_cors import CORS
from extensions import db
import os



def create_app():
    app = Flask(__name__)

    # Database
    db_path = os.getenv('DATABASE_URL', 'sqlite:///careertrail.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["SECRET_KEY"] = "$uper$ecret"

    # --- CORS: allow your frontend origins; credentials if you need cookies/sessions ---
    CORS(
        app,
        resources={r"/api/*": {"origins": [
            "http://127.0.0.1:5500",
            "http://localhost:5500"
        ]}},
        supports_credentials=True
    )

    # Init DB
    db.init_app(app)

    # Import models BEFORE usage
    from models import (
        User,
        SkillMaster,
        UserSkill,
        Recommendation,
        RecommendationDetail,
        ActivityLog
    )

    # Register routes with explicit prefixes that match the fetch URLs
    from routes.career import career_bp
    from routes.skills import skills_bp
    from routes.auth import auth_bp

    app.register_blueprint(career_bp, url_prefix="/api/career")
    app.register_blueprint(skills_bp,  url_prefix="/api/skills")
    app.register_blueprint(auth_bp,    url_prefix="/api/auth")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="127.0.0.1", port=5000, debug=True)
