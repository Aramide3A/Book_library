const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name : String, 
})

const Genres = mongoose.model('Genre', schema)

module.exports = Genres