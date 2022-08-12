const PORT = 5000;
const express = require('express');

const app = express();

app.use(express.json());

const loggerMiddeware = (req, res, next) => {
    let d = new Date,
        dformat = [d.getDate(),
        d.getMonth() + 1,
        d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
    next()
    let diff = new Date() - d
    console.log(`--------> ${dformat} | ${req.method}: ${req.url} | ${diff} ms`)
}

app.use('/', loggerMiddeware)

const booksRouter = require('./routers/books')
const clientRouter = require('./routers/client')
const infoRouter = require('./routers/info')

app.use('/books', booksRouter)
app.use('/client', clientRouter)
app.use(infoRouter)
app.listen(PORT, () => {
    console.log(`Server has been started on PORT ${PORT}`)
})