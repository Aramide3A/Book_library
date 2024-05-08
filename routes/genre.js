const express = require('express')
const router = express.Router()
const Genre = require('../models/genreModel')
const Joi = require('joi')

function validate(genre){
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    })
    return schema.validate(genre)
}

router.get('/', async(req, res)=>{
    const genres = await Genre.find()
    res.send(genres)
})

router.post('/', async(req, res)=>{
    const {error} = validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    const genre = new Genre(req.body)
    await genre.save()
    res.send(genre)
})

router.put('/:id',async(req, res)=>{
    const id = req.params.id
    const {error} = validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    const find = findGenre(id)
    const genre = await Genre.findByIdAndUpdate(id, req.body, {new: true})
    res.send(genre)
})

router.delete('/:id',async(req, res)=>{
    const id = req.params.id
    const genre = await Genre.findByIdAndDelete(id)
    res.send(`${genre.name} deleted successfully`)
})

module.exports = router 