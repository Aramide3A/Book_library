const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title :{
        type : String,
        required: true,
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
schema.index({ title: 1, author: 1 }, { unique: true });
const Books = mongoose.model('Book', schema)

module.exports = Books