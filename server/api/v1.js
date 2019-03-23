const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const User = require('../models/user.model');
const mongoose = require('../config/mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(jwt.sign({ login: 'dd1mk', password: '123' }, 'secret', { expiresIn: 3600 }));
});

router.get('/secret', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/login', (req, res) => {
  User.findOne({ login: req.body.login}, (err, user) => {
      if (err || !user) {
          res.json({ err: 'User not found' });
      } else {
          if (user.checkPassword(req.body.password)) {
              res.json({ token: jwt.sign({login: req.body.login}, 'secret', {expiresIn: 3600}) } )
          } else {
              res.json({ err: 'passwords don`t   match' });
          }
      }
  })
});

router.post('/signup',(req, res) => {
  if (req.body.login && req.body.password) {
    const newUser = User({ login: req.body.login, password: req.body.password });
    newUser.save((err, user) => {
      if (err) {
        res.json({
          error: err,
        });
        res.end();
      }
      res.status(201).json({
        user,
      });
    });
  }
});

router.post('/login');

module.exports = router;
