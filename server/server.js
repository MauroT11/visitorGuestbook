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
        const date = req.body.date
        console.log(date)
        // console.log(req.body.messages.name)

        const newMessage = db.prepare(`INSERT INTO guests (name, message, likes, date) VALUES (?, ?, 0, ?)`).run(name, message, date)
        // console.log(newMessage)

        res.status(200).json(newMessage)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

app.put('/guest/likes/:id&:likes', (req, res) => {
    try {
        const id = req.params.id
        let likes = req.params.likes

        likes++

        const updateLikes = db.prepare(`UPDATE guests SET likes = ? WHERE id = ?`).run(likes, id)
        // console.log(updateLikes)

        res.status(204).json({message: updateLikes})
    } catch (err) {
        res.status(500).json({error: err})
    }
})

app.delete('/guest/:id', (req, res) => {
    try {
        const id = req.params.id
        const delGuest = db.prepare(`DELETE FROM guests WHERE id = ?`).run(id)

        res.status(200).json({guestDeleted: delGuest})
    } catch (err) {
        res.status(500).json({error: err})
    }
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`)
});