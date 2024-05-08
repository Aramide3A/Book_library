const express = require('express')
const router = express.Router()
const Joi  = require('joi')
const Books = require('../models/bookModel')
const Genres = require('../models/genreModel')
const Authors = require('../models/authorModel')

function validate(book){
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        author: Joi.string().min(2).required(),
        genre: Joi.string().min(2).required(),
        about: Joi.string().min(2).required(),
    })
    return schema.validate(book)
}

router.post('/', async(req, res)=>{
    const {error} = validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    const genre =await Genres.findOne({name : req.body.genre})
    if(!genre) {
        const genre = new Genres({ name: req.body.genre })
        await genre.save()
    }

    const author = await Authors.findOne({name : req.body.author})
    if(!author) {
        const author = new Authors({ name: req.body.author })
        await author.save()
    }

    const book = new Books({
        name : req.body.name,
        genre : genre._id,
        author : author._id,
        about : req.body.about
    })
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