import express from "express";
import cors from "cors";
import Database from "sqlite3";

const app = express()
// const db = new Database('database.db')
const PORT = '9090'

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({message: 'HELLO'})
    res.status(200)
})

app.get('/guest', (req, res) => {
    res.send({message: 'GUESTS'})
    res.status(200)
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`)
});