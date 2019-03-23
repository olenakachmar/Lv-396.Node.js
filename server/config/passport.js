const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const mongoose = require('./mongoose');
const User = require('../models/user.model');

//mongoose.connect('mongodb+srv://admin:dwr62o6bnAMPS45i@cluster0-1xrnm.mongodb.net/hrms?retryWrites=true', { useNewUrlParser: true });

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, (jwtpayload, done) => {
  User.findOne({ login: jwtpayload.login }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

module.exports = passport;
