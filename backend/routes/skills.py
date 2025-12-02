from flask import Blueprint, jsonify
from app import db
from models import SkillMaster


skills_bp = Blueprint('skills', __name__)


@skills_bp.route('/skills', methods=['GET'])
def get_skills():
    skills = SkillMaster.query.order_by(SkillMaster.skill).all()
    data = [{'id': s.id, 'skill': s.skill, 'category': s.category} for s in skills]
    return jsonify({'skills': data})