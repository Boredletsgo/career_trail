from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize DB instance
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # --- Correct SQLite DB path ---
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///careertrail.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # init DB
    db.init_app(app)

    # import models BEFORE create_all()
    from models import (
        User,
        SkillMaster,
        UserSkill,
        Recommendation,
        RecommendationDetail,
        ActivityLog
    )

    # Register routes
    from routes.career import career_bp
    from routes.skills import skills_bp
    from routes.auth import auth_bp

    app.register_blueprint(career_bp, url_prefix="/api")
    app.register_blueprint(skills_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")

    # Create all tables
    with app.app_context():
        db.create_all()
        print("✅ Database & tables created successfully!")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
