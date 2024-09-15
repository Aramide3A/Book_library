const express = require('express')
const borrowList = require('../models/borrowModel')
const reserveList = require('../models/reservationModel')
const passport = require('passport')
const router = express.Router()

router.get('/history', passport.authenticate('jwt', {session:false}), async(req,res)=>{
    try {
        const getActiveHistory = await borrowList.find({$and: [{ active:true },{ user: req.user._id }]})
        const getHistory = await borrowList.find({$and: [{ active:false },{ user: req.user._id }]})
        const getReserveList = await reserveList.find({ user: req.user._id })
        res.status(200).send({
            'borrowed' : getActiveHistory,
            "returned" : getHistory,
            'reserved' : getReserveList
        })
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router