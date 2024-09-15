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
    },
    fine: {
        type : Number,
        default : 0
    },
    active: {
        type: Boolean,
        default : true
    },
    overdue: {
        type : Date
    },
    return: {
        type : Date
    }},
    {timestamps: true}
)

const borrowList = mongoose.model('Borrow', schema)

module.exports = borrowList