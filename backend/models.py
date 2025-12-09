from extensions import db
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    experience_level = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class SkillMaster(db.Model):
    __tablename__ = 'skills_master'
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String, unique=True, nullable=False)
    category = db.Column(db.String)


class UserSkill(db.Model):
    __tablename__ = 'user_skills'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    skill_id = db.Column(db.Integer, db.ForeignKey('skills_master.id'))


class Recommendation(db.Model):
    __tablename__ = 'recommendations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    dream_role = db.Column(db.String, nullable=False)
    learning_style = db.Column(db.String)
    experience = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class RecommendationDetail(db.Model):
    __tablename__ = 'recommendation_details'
    id = db.Column(db.Integer, primary_key=True)
    recommendation_id = db.Column(db.Integer, db.ForeignKey('recommendations.id'))
    career_path = db.Column(db.Text)  # JSON string
    skills_gap = db.Column(db.Text)  # JSON string
    certifications = db.Column(db.Text)  # JSON string
    learning_plan = db.Column(db.Text)  # JSON string
    roadmap = db.Column(db.Text)  # JSON string


class ActivityLog(db.Model):
    __tablename__ = 'activity_log'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    activity_type = db.Column(db.String)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
