const mongoose = require('mongoose')
const Genre =  require('./genreModel')
const Author =  require('./authorModel')


const schema = mongoose.Schema({
    name :{
        type : String,
        required: true,
        unique: true,
    }, 
    genre: {
        type : mongoose.Schema.Types.ObjectId,
        ref : Genre, 
    },
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : Author,
    },
    about: {
        type : String,
        required: true, 
    },
})

const Books = mongoose.model('Book', schema)

module.exports = Books