from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
load_dotenv()
db = SQLAlchemy()
def create_app():
    app = Flask(__name__)
    CORS(app)

    db_path = os.getenv('DATABASE_URL', 'sqlite:///careertrail.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Register blueprints
    from routes.career import career_bp
    from routes.skills import skills_bp
    from routes.auth import auth_bp


    app.register_blueprint(career_bp, url_prefix='/api')
    app.register_blueprint(skills_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')


    # Create DB tables if not exists
    with app.app_context():

        from models import User, SkillMaster, UserSkill, Recommendation, RecommendationDetail, ActivityLog
    db.create_all()


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)