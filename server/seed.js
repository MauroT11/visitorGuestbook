import Database from 'better-sqlite3';

const db = new Database('database.db')

db.exec(`CREATE TABLE IF NOT EXISTS guests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT,
    likes INTEGER,
    date TEXT
)`)

db.exec(`INSERT INTO guests (name, message, likes, date) VALUES 
    ('John Doe', 'Great party!', 9, '1/2/2024 12:34'),
    ('Jane Doe', 'Had a great time.', 3, '1/2/2024 18:21'),
    ('Robert Smith', 'Cant wait for the next party!!', 0, '3/2/2024 00:32')
`)