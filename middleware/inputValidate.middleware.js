const Joi = require('joi')

function userValidate(user){
    const schema = Joi.object({
        username : Joi.string().min(2),
        email: Joi.string().email().min(2).required(),
        password : Joi.string().min(7).required(),
    })
    return schema.validate(user)
}

function bookValidate(book){
    const schema = Joi.object({
        title: Joi.string().min(2).required(),
        author: Joi.string().min(2).required(),
        genre: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        quantity: Joi.number().required(),
    })
    return schema.validate(book)
}

module.exports = {userValidate, bookValidate}