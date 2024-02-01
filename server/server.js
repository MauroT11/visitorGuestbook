import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express()
const db = new Database('database.db')
const PORT = '9090'

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({message: 'HELLO'})
    res.status(200)
})

app.get('/guest', (req, res) => {
    try {
        let messages = db.prepare(`SELECT * FROM guests`).all()
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

app.post('/guest', (req, res) => {
    try {
        const name = req.body.messages.name
        const message = req.body.messages.message
        // console.log(req.body.messages.name)

        const newMessage = db.prepare(`INSERT INTO guests (name, message) VALUES (?, ?)`).run(name, message)
        console.log(newMessage)
        res.status(200).json(newMessage)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

app.get('/guest', (req, res) => {
    res.send({message: 'GUESTS'})
    res.status(200)
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`)
});