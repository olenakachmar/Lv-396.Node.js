const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../../config/passport');
const User = require('../../models/user.model');

const router = express.Router();

router.get('/secret', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.send('U passed the authentication');
});

router.post('/login', (req, res) => {
  User.findOne({ login: req.body.login }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ err: 'User not found' });
    } else if (user.checkPassword(req.body.password)) {
      res.json({ token: jwt.sign({ login: req.body.login }, process.env.JWT_SECRET, { expiresIn: 3600 }) });
    } else {
      res.status(401).json({ err: 'passwords don\'t match' });
    }
  });
});

router.post('/signup', (req, res) => {
  if (req.body.login && req.body.password) {
    const newUser = User({ login: req.body.login, password: req.body.password });
    newUser.save((err, user) => {
      if (err) {
        res.status(401).json({
          err,
        });
      } else {
        res.status(201).json({
          user,
        });
      }
    });
  } else {
    res.status(401).json({
      err: 'You must provide password and login',
    });
  }
});

module.exports = router;
