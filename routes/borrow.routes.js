const express = require('express')
const passport = require('passport')
const Books = require('../models/bookModel')
const borrowList = require('../models/borrowModel')
const reserveList = require('../models/reservationModel')
const router = express.Router()


//Borrow book
router.post('/:id/borrow', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    try {
        let book = req.params.id
        const getBook =await Books.findById(book)
        if(!getBook) return res.status(404).send('Book Not Found')
        
        const checkBorrow = await borrowList.findOne({$and: [{ book: getBook._id },{ user: req.user._id }]})
        if(checkBorrow) return res.status(200).send('You cant borrow the same book twice')

        if (getBook.availabilty === false) return res.status(200).send('This Book is currently not available, Please create a reservation')
        
        const overdue = new Date()
        overdue.setDate(overdue.getDate() + 7)
        
        const newBorrow = new borrowList({
            user : req.user._id,
            book : book,
            overdue : overdue
        })
        await newBorrow.save()

        getBook.quantity -= 1
        if (getBook.quantity === 0){
            getBook.availabilty = false
        }
        await getBook.save()

        return res.status(200).send(`You have successfully borrowed ${getBook.title} by ${getBook.author},  Overdue date is ${overdue.toDateString()}`)
    } catch (error) {
        return res.status(500).send(error)
    }
})


//Return Borrowed books
router.post('/borrow/:id/return', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    try {
        const borrow = req.params.id
        const getBorrowList =await borrowList.findById(borrow)
        if(!getBorrowList) return res.status(404).send('Invaliid')

        getBorrowList.active = false
        getBorrowList.return = Date.now()
        await getBorrowList.save()

        const getBook = await Books.findById(getBorrowList.book)

        getBook.quantity += 1
        if (getBook.quantity > 0){
            getBook.availabilty = true
        }
        await getBook.save()

        return res.status(200).send(`You have successfully returned ${getBook.title}`)
    } catch (error) {
        return res.status(500).send(error)
    }
})


// Renew Borrow
router.post('/borrow/:id/renew', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    try {
        let borrow = req.params.id
        const getBorrowList =await borrowList.findById(borrow)
        if(!getBorrowList) return res.status(404).send('Invaliid')

        const getBook = await Books.findById(borrowList.book)
        
        const currentDate = new Date()
        const daysBeforeOverdue = (getBorrowList.overdue - currentDate) / (1000 * 60 * 60 * 24);
        
        if (daysBeforeOverdue > 2) {
            return res.status(400).send('Renewal is only allowed within 2 days of the overdue date');
        }
        
        const checkReservation = reserveList.find({book: getBook._id})
        if (checkReservation.length >= getBook.quantity) return res.status(400).send('Book Currently Not Avialable For Renewal')

        getBorrowList.overdue.setDate(getBorrowList.overdue + 7)
        await getBorrowList.save()
        

        return res.status(200).send(`You have successfully returned ${getBook.title}`)
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports= router