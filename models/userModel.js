const mongoose = require('mongoose')

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})

const User = mongoose.model('user', schema)

module.exports = User