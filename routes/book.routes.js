const express = require('express')
const router = express.Router()
const Joi  = require('joi')
const Books = require('../models/bookModel')
const Genres = require('../models/genreModel')
const Authors = require('../models/authorModel')
const passport = require('passport')
const bookValidate = require('../middleware/inputValidate.middleware')
const validateAdmin = require('../middleware/adminAuth.middleware')

//Router to create new books(for admins only)
router.post('/new',[passport.authenticate('jwt',{session:false}), validateAdmin], async(req, res)=>{
    const {error} = bookValidate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    const book = new Books(req.body)
    await book.save()
    res.send(book)
})

router.get('/', async(req, res)=>{
    const allbooks = await Books.find()
    res.send(allbooks)
})

router.put('/:id', async(req, res)=>{
    const book = await  Books.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.send(`${book}`)
})

router.delete('/:id', async(req, res)=>{
    const book =await  Books.findByIdAndDelete(req.params.id)
    res.send(`${book.name} was successfully deleted`)
})

module.exports = router