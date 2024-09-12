const mongoose = require('mongoose')
const Genre =  require('./genreModel')
const Author =  require('./authorModel')
const { boolean } = require('joi')


const schema = mongoose.Schema({
    title :{
        type : String,
        required: true,
        unique: true
    },
    author: {
        type : String,
        required: true
    },
    genre: {
        type : String
    },
    description: {
        type : String,
        required: true, 
    },
    availability: {
        type: Boolean,
        default: true
    },
    quantity : {
        type: Number
    }
})

const Books = mongoose.model('Book', schema)

module.exports = Books