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
    full_name: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})

const User = mongoose.model('user', schema)

module.exports = User