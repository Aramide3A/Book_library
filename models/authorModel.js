const { required } = require('joi')
const mongoose = require('mongoose')


const schema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        uppercase: true, 
    },
    about: {
        type: String
    }
})

const Authors = mongoose.model('Author', schema)

module.exports = Authors