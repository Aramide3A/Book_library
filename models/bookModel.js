const mongoose = require('mongoose')
const Genre =  require('./genreModel')
const Author =  require('./authorModel')
const { boolean } = require('joi')


const schema = mongoose.Schema({
    title :{
        type : String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    author: {
        type : String,
        required: true,
        trim: true,
        lowercase: true
    },
    genre: {
        type : String,
        trim: true,
        lowercase: true
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