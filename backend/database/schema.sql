-- Run this to create tables if you prefer SQL script over SQLAlchemy create_all()
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
full_name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
experience_level TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS skills_master (
id INTEGER PRIMARY KEY AUTOINCREMENT,
skill TEXT UNIQUE NOT NULL,
category TEXT
);


CREATE TABLE IF NOT EXISTS user_skills (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
skill_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (skill_id) REFERENCES skills_master(id)
);


CREATE TABLE IF NOT EXISTS recommendations (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
dream_role TEXT NOT NULL,
learning_style TEXT,
experience TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS recommendation_details (
id INTEGER PRIMARY KEY AUTOINCREMENT,
recommendation_id INTEGER NOT NULL,
career_path TEXT,
skills_gap TEXT,
certifications TEXT,
learning_plan TEXT,
roadmap TEXT,
FOREIGN KEY (recommendation_id) REFERENCES recommendations(id)
);


CREATE TABLE IF NOT EXISTS activity_log (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
activity_type TEXT,
description TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id)
);

