const express = require('express');

const router = express.Router();

let db = require('../db/data.js')

router.post('/', (req,res) => {
    let body = req.body
    let data = db.readData()
    if (!body.id) {
        res.status(400).send(`id:${id} client doesn't exist`)
    }

    if (!body.firstname) {
        res.status(400).send("firstname field is required");
        return
    }

    if (!body.lastname) {
        res.status(400).send("lastname field is required");
        return
    }

    if (!body.email) {
        res.status(400).send("email field is required");
        return
    }

    if (!body.phone) {
        res.status(400).send("phone field is required")
    }

    if (!body.date_of_birth) {
        res.status(400).send("date_of_birth field of required")
    }
    
    if (!body.address) {
        res.status(400).send("address field of required")

    }
    for (let i = 0; i < data.clients.length; i++) {
        const element = data.clients[i];
        if (element.id == body.id) {
            res.status(400).send(`id:${body.id} have a client!`);
            return
        }
    }

    body.createAt = new Date()
    data.clients.push(body)
    db.writeData(data)

    res.status(201).send("successfully created")
})
router.get('/', (req, res) => {
    let data = db.readData()
    let search = req.query.search

    if (!search) {
        search = ""
    }

    let list = data.clients.filter(e => (e.firstname + e.lastname).toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("clients resource not found!")
        return
    }

    res.json(list)
})

router.get('/:id', (req, res) => {
    let id = req.params.id
    let data = db.readData()
    let contact = data.clients.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} student doesn't exist`);
        return
    }

    res.status(200).json(contact)
})

router.put('/', (req, res) => {
    let data = db.readData()
    let body = req.body

    let client = data.clients.find(e => e.id == body.id)
    
    if (!client) {
        res.status(400).send(`id:${body.id} client contact doesn't exist!`);
        return
    }
    if (!body.id) {
        res.status(400).send(`id:${id} client doesn't exist`)
    }

    if (!body.firstname) {
        res.status(400).send("firstname field is required");
        return
    }

    if (!body.lastname) {
        res.status(400).send("lastname field is required");
        return
    }

    if (!body.email) {
        res.status(400).send("email field is required");
        return
    }

    if (!body.phone) {
        res.status(400).send("phone field is required")
    }

    if (!body.date_of_birth) {
        res.status(400).send("date_of_birth field of required")
    }
    
    if (!body.address) {
        res.status(400).send("address field of required")

    }

    for (let i = 0; i < data.clients.length; i++) {
        const element = data.clients[i];
        if (element.id == body.id) {
            body.createAt = data.clients[i].created_at
            body.updateAt = new Date()
            data.clients[i] = body
            break;
        }
    }

    db.writeData(data)
    res.status(200).send("successfully updated")
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let data = db.readData()

    let contact = data.clients.find(e => e.id == id)
    if (!contact) {
        res.status(400).send(`id:${id} student doesn't exist!`);
        return
    }

    data.clients = data.clients.filter(e => e.id != id)
    db.writeData(data)

    res.status(200).send("successfully deleted")
})

module.exports = router