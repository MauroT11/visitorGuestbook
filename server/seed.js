import Database from 'better-sqlite3';

const db = new Database('database.db')

db.exec(`CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT
)`)

db.exec(`INSERT INTO guests (name, message) VALUES 
    ('John Doe', 'Great party!'),
    ('Jane Doe', 'Had a great time.'),
    ('Robert Smith', 'When is the next party?')
`)