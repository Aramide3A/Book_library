const express = require('express')
const app = express()
const mongoose = require('mongoose')
const genre = require('./routes/genre')
const book = require('./routes/book')


app.use(express.json())
app.use('/api/genre', genre)
app.use('/api/book', book)

try {
    mongoose.connect('mongodb://localhost:27017/library')
    console.log('Database Connected!')
} catch (error) {
    console.log(error)
}

app.listen(3000, ()=>{
    console.log('server listening on 3000')
})