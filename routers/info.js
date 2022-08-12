const express = require('express')

const router = express.Router()

let db = require('../db/data.js')

router.get('/info',(req,res)=>{

    let data = db.readData()
    res.json(data.info)

})

router.post('/info/:cid/:bid', (req, res)=> {
    let client_id = parseInt(req.params.cid)
    let book_id = parseInt(req.params.bid)

    let data = db.readData()

    if (!client_id) {
        res.status(400).send("client_id is required");
        return
    }

    if (!book_id) {
        res.status(400).send("book_id is required");
        return
    }

    for (let i = 0; i < data.info.length; i++) {
        const element = data.info[i];
        if (element.client_id == client_id && element.book_id == book_id) {
            res.status(400).send(`client_id:${client_id} already has been joined to the book of book_id:${book_id}!`);
            return
        }
    }

    data.info.push({
        client_id: client_id,
        book_id: book_id,
        returned_day: null,
        joined_at: new Date()
    })

    db.writeData(data)

    res.status(201).send("successfully created")
})

router.put('/info/:cid/:bid', (req, res) => {
    let client_id = parseInt(req.params.cid)
    let data = db.readData()
    let found = data.info.find(e => e.client_id == client_id && e.returned_day == null)
    if(!found){
        res.send("All books were returned")
    }
    found.returned_day = new Date()
    db.writeData(data)
    res.send("successfully updated")  

})

router.get('/info/:cid', (req, res)=> {
    let client_id = parseInt(req.params.cid)
    
    let client = db.readData().clients.find(e => e.id == client_id)

    if (!client) {
        res.status(400).send("client_id is required");
        return
    }

    let infoList = db.readData().info.filter(e => e.client_id == client.id)
    if (!infoList.length) {
        res.status(400).send(`client_id:${client_id} doesn't have books`);
        return
    }
    
    infoList.forEach(e => {
        for (let i = 0; i < db.readData().books.length; i++) {
            if (e.book_id == db.readData().books[i].id) {
                e.book = db.readData().books[i]
                break
            }
        }
    });

    res.json({books: infoList, client: client})
})

module.exports = router