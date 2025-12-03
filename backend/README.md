CareerTrail - Backend


## Setup (local)
1. Create a Python venv and activate it.
2. Install dependencies: `pip install -r requirements.txt`
3. Copy `.env` and set DATABASE_URL and optional HF_MODEL_NAME
4. Run `python app.py` to start the server (defaults to sqlite file `careertrail.db`)


## Notes
- The career generator uses a HuggingFace model if available (set HF_MODEL_NAME). If not available, a rule-based fallback will be used.
- Do NOT commit `.env` to git. Put secrets in GitHub Actions secrets for CI/CD deployment.

## Checking DB

from app import create_app, db
from sqlalchemy import inspect

app = create_app()

with app.app_context():
    inspector = inspect(db.engine)
    print(inspector.get_table_names())
