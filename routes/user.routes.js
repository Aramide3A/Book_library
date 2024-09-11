const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userValidate = require('../middleware/inputValidate.middleware')
require('dotenv').config()
const Secret_Key = process.env.Secret_Key

router.post('/register', async(req,res)=>{
    const {error} = userValidate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    const checkUser =await User.findOne({$or: [{ username: req.body.username }, { email: req.body.email }]})
    if(checkUser){return res.status(400).send('username/email already exists')}


    const {username, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username : username,
        email: email,
        password : hashedPassword
    })

    await newUser.save()
    const payload = {
        id : newUser._id
    }
    const token = jwt.sign(payload, Secret_Key)
    res.status(200).send(token)
})

router.post('/login', async(req,res)=>{
    const {error} = userValidate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    const {email, password} = req.body
    const checkUser =await User.findOne({ email: email })
    if(!checkUser){return res.status(400).send('Invalid Login Parameters')}

    const confirmPassword = await bcrypt.compare(password, checkUser.password)
    if(!confirmPassword){return res.status(400).send('Invalid Login Parameters')}

    const payload = {
        id : checkUser._id
    }
    const token = jwt.sign(payload, Secret_Key)
    res.status(200).send(token)
})

module.exports = router