const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const genre = require('./routes/genre')
const book = require('./routes/book')
const auth = require('./routes/user.routes')
require('dotenv').config()

app.use(express.json())
app.use(passport.initialize())
require('./middleware/auth.middleware')
app.use('/api/genre', genre)
app.use('/api/book', book)
app.use('/api/authenticate', auth)

try {
    mongoose.connect('mongodb://localhost:27017/library')
    console.log('Database Connected!')
} catch (error) {
    console.log(error)
}

app.listen(3000, ()=>{
    console.log('server listening on 3000')
})