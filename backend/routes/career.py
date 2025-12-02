from flask import Blueprint, request, jsonify
from app import db
from models import Recommendation, RecommendationDetail
from career_model.generator import generate_recommendation
import json


career_bp = Blueprint('career', __name__)


@career_bp.route('/generate-career-path', methods=['POST'])
def generate():
    payload = request.json
    # Basic validation
    skills = payload.get('skills', [])
    dream_role = payload.get('dream_role')
    experience = payload.get('experience')
    learning_style = payload.get('learning_style')
    user_id = payload.get('user_id')


    if not dream_role:
     return jsonify({'error': 'dream_role required'}), 400


    # call generator (AI or rule-based)
    result = generate_recommendation({
    'skills': skills,
    'dream_role': dream_role,
    'experience': experience,
    'learning_style': learning_style
    })


    # Persist recommendation
    rec = Recommendation(user_id=user_id, dream_role=dream_role, learning_style=learning_style, experience=experience)
    db.session.add(rec)
    db.session.commit()


    detail = RecommendationDetail(
    recommendation_id=rec.id,
    career_path=json.dumps(result.get('career_path', [])),
    skills_gap=json.dumps(result.get('skills_gap', [])),
    certifications=json.dumps(result.get('recommended_certifications', [])),
    learning_plan=json.dumps(result.get('learning_plan', [])),
    roadmap=json.dumps(result.get('roadmap', []))
    )
    db.session.add(detail)
    db.session.commit()


    return jsonify({'recommendation_id': rec.id, 'result': result})

