const mongoose =  require('mongoose')
const User = require('./userModel')
const Books = require('./bookModel')

const schema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    book : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Books,
        required: true
    }},
    {timestamps: true
})

const reserveList = mongoose.model('Reserve', schema)

module.exports = reserveList