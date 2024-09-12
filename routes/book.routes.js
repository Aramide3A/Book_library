const express = require('express')
const router = express.Router()
const Books = require('../models/bookModel')
const passport = require('passport')
const {bookValidate} = require('../middleware/inputValidate.middleware')
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


//Route to get all books
router.get('/',passport.authenticate('jwt', {session: false}), async(req, res)=>{
    const searchCriteria = {}

    const title = req.query.title
    const author = req.query.author
    const genre = req.query.genre

    if (title) {
        searchCriteria.title = title
    }
    if (author) {
        searchCriteria.author = author
    }
    if (genre) {
        searchCriteria.genre = genre
    }

    const allbooks = await Books.find(searchCriteria).select('-availability')
    res.send(allbooks)
})


//Route to update books(for admins only)
router.put('/:id',[passport.authenticate('jwt',{session:false}), validateAdmin], async(req, res)=>{
    const book = await  Books.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.send(`${book}`)
})


//Route to delete books(for admins only)
router.delete('/:id',[passport.authenticate('jwt',{session:false}), validateAdmin], async(req, res)=>{
    const book =await  Books.findByIdAndDelete(req.params.id)
    res.send(`${book.name} was successfully deleted`)
})



module.exports = router