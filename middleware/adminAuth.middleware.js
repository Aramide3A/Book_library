function validateAdmin(req, res, next){
    if (req.user.isAdmin === false) return res.status(401).send('Unauthorized, Only admin can access this route')
    next()
}

module.exports = validateAdmin