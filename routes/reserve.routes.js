const express = require('express')
const Books = require('../models/bookModel')
const borrowList = require('../models/borrowModel')
const reserveList = require('../models/reservationModel')
const passport = require('passport')
const router = express.Router()


//Route to reserve books 
router.post('/:id/reserve', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    try {
        let book = req.params.id
        const getBook =await Books.findById(book)
        if(!getBook) return res.status(404).send('Book Not Found')
        
        const checkBorrow = await borrowList.findOne({$and: [{ book: getBook._id },{ user: req.user._id }]})
        if(checkBorrow.active) return res.status(200).send('You cant reserve a book you borrowed')

        if (checkBorrow && checkBorrow.active) return res.status(200).send('This Book is currently available, you can go ahead to borrow it')
        
        const checkReservation = await reserveList.findOne({$and: [{ book: getBook._id },{ user: req.user._id }]})
        if(checkReservation) return res.status(200).send('You have reserved this book already')
        

        const newReserve = new reserveList({
            book : getBook,
            user : req.user._id
        })

        await newReserve.save()

        return res.status(200).send(`You have successfully reserved ${getBook.title} by ${getBook.author}`)
    } catch (error) {
        return res.status(500).send(error)
    }
})


//Route to delete reservation
router.delete('/reserve/:id/delete', passport.authenticate('jwt',{session:false}), async(req,res)=>{
    try {
        const reserve = req.params.id
        const deleteReservation = await reserveList.findByIdAndDelete(reserve)
        res.status(200).send(`You have successfully deleted your reservation`)
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router