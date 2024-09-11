const Joi = require('joi')

function userValidate(user){
    const schema = Joi.object({
        username : Joi.string().min(2),
        email: Joi.string().email().min(2).required(),
        password : Joi.string().min(7).required(),
    })
    return schema.validate(user)
}

module.exports = userValidate