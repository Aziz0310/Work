const express = require('express');

const router = express.Router();

let db = require('../db/data.js')

router.post('/', (req,res) => {
    let body = req.body

    if (!body.id) {
        res.status(400).send(`id:${id} field is required`)
        return
    }

    if (!body.title) {
        res.status(400).send("title field is required");
        return
    }

    if (!body.gender) {
        res.status(400).send("gender field is required");
        return
    }

    if (!body.description) {
        res.status(400).send("description field is required");
        return
    }

    if (!body.author) {
        res.status(400).send("author field is required");
        return
    }

    if (!body.publish_year) {
        res.status(400).send("publish year field is required");
        return
    }

    if (!body.cover_photo_url) {
        res.status(400).send("cover photo url field is required");
        return
    }

    for (let i = 0; i < db.readData().books.length; i++) {
        const element = db.readData().books[i];
        if (element.id == body.id) {
            res.status(400).send(`id:${body.id} book exists!`)
            return
        }
    }

    body.createAt = new Date()
    
    let data = db.readData()
    data.books.push(body)
    db.writeData(data)

    res.status(201).send("successfully created")
})

router.get('/', (req, res) => {
    let list = db.readData().books
    if (list.length == 0) {
        res.status(404).send("books resource not found!")
        return
    }

    res.json(list)
})

router.get('/:id', (req, res) => {
    let id = req.params.id

    let book = db.readData().books.find(e => e.id == id)
    if (!book) {
        res.status(400).send(`id:${id} book doesn't exist`);
        return
    }

    res.status(200).json(book)
})

router.put('/', (req, res) => {
    let body = req.body
    let data = db.readData()

    let book = data.books.find(e => e.id == body.id)

    if (!book) {
        res.status(400).send(`id:${body.id} books doesn't exist!`);
        return
    }

     if (!body.id) {
        res.status(400).send(`id:${id} field is required`)
        return
    }

    if (!body.title) {
        res.status(400).send("title field is required");
        return
    }

    if (!body.gender) {
        res.status(400).send("gender field is required");
        return
    }

    if (!body.description) {
        res.status(400).send("description field is required");
        return
    }

    if (!body.author) {
        res.status(400).send("author field is required");
        return
    }

    if (!body.publish_year) {
        res.status(400).send("publish year field is required");
        return
    }

    if (!body.cover_photo_url) {
        res.status(400).send("cover photo url field is required");
        return
    }

    for (let i = 0; i < data.books.length; i++) {
        const element = data.books[i];
        if (element.id == body.id) {
            body.createAt = data.books[i].created_at
            body.updateAt = new Date()
            data.books[i] = body
            break;
        }
    }

    db.writeData(data)

    res.status(200).send("successfully updated")
})

router.delete('/:id', (req, res) =>{
    let id = req.params.id

    let book = db.readData().books.find(e => e.id == id)
    if (!book) {
        res.status(400).send(`id:${id} books doesn't exist!`);
        return
    }
    
    let data = db.readData()
    data.books = data.books.filter(e => e.id != id)
    db.writeData(data)

    res.status(200).send("successfully deleted")
})


module.exports = router