import json
from .model_loader import USE_MODEL, tokenizer, model, MODEL_NAME
from .prompts import BASE_PROMPT




def _call_model(prompt, max_length=512):
    if not USE_MODEL:
        return None
    inputs = tokenizer(prompt, return_tensors='pt', truncation=True)
    outputs = model.generate(**inputs, max_length=max_length)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return text




def _rule_based_generate(inputs):
    # Simple deterministic generator for MVP. Expand with more rules later.
    skills = inputs.get('skills', [])
    dream = inputs.get('dream_role', 'desired role')
    experience = inputs.get('experience', 'Beginner')


    career_path = [f'{dream} Intern/Junior', f'{dream} Mid', f'{dream} Senior', f'{dream} Lead']
    skills_gap = [s + ' (deepen)' for s in ['Data Structures', 'System Design'] if s not in skills]
    certs = ['Relevant certification 1', 'Relevant certification 2']
    learning_plan = [
    {'week': 1, 'task': 'Learn foundations'},
    {'week': 2, 'task': 'Build a small project'},
    {'week': 3, 'task': 'Practice interviews'}
    ]
    roadmap = ['Beginner topics', 'Intermediate projects', 'Advanced patterns']


    return {
    'career_path': career_path,
    'skills_gap': skills_gap,
    'recommended_certifications': certs,
    'learning_plan': learning_plan,
    'roadmap': roadmap
    }




def generate_recommendation(user_input: dict) -> dict:
    prompt = BASE_PROMPT.format(
    skills=', '.join(user_input.get('skills', [])),
    experience=user_input.get('experience', 'Beginner'),
    dream_role=user_input.get('dream_role', 'Developer'),
    learning_style=user_input.get('learning_style', 'Videos')
    )


    if USE_MODEL:
        try:
            raw = _call_model(prompt)
            # Expect JSON from model; attempt to parse
            parsed = json.loads(raw)
            return parsed
        except Exception as e:
            print('Model call failed, falling back to rule-based:', e)
            return _rule_based_generate(user_input)
        else:
            return _rule_based_generate(user_input)