const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const User = require('../models/userModel')
require('dotenv').config()
const Secret_Key = process.env.Secret_Key
    
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Secret_Key

passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {
    try {
        const user = await User.findById(jwt_payload.id)
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.error(error);
        return done(error, false)
    }
}));