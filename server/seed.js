import Database from 'better-sqlite3';

const db = new Database('database.db')

db.exec(`CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT,
    likes INTEGER
)`)

db.exec(`INSERT INTO guests (name, message, likes) VALUES 
    ('John Doe', 'Great party!', 9),
    ('Jane Doe', 'Had a great time.', 3),
    ('Robert Smith', 'When is the next party?', 0)
`)