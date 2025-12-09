from flask import Blueprint, request, jsonify
from extensions import db
from models import User
from werkzeug.security import generate_password_hash, check_password_hash


auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'email and password required'}), 400


    existing = User.query.filter_by(email=data['email']).first()
    if existing:
        return jsonify({'error': 'user already exists'}), 400


    user = User(
    full_name=data.get('full_name', ''),
    email=data['email'],
    password_hash=generate_password_hash(data['password']),
    experience_level=data.get('experience_level')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'created', 'user_id': user.id}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()
    if not user or not check_password_hash(user.password_hash, data.get('password','')):
     return jsonify({'error': 'invalid credentials'}), 401
    # For MVP we return user id; you can add JWT later
    return jsonify({'message': 'ok', 'user_id': user.id})