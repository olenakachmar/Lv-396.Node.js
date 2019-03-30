const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const { JWT_SECRET } = require('../../config/config');
const config = require('../../config/config');

const { arrKeys } = config;

const router = express.Router();

router.post('/login', (req, res) => {
  const { login } = req.body;
  User.findOne({ login }, (err, user) => {
    if (err || !user) {
      res.json({ err: 'User not found' });
    } else if (user.checkPassword(req.body.password)) {
      res.json({ token: jwt.sign({ login, type: user.type }, JWT_SECRET, { expiresIn: 3600 }) });
    } else {
      res.json({ err: 'passwords don\'t match' });
    }
  });
});

router.post('/signup', (req, res) => {
  const parameters = arrKeys.reduce((obj, el) => {
    if (req.body[el]) {
      return { ...obj, [el]: req.body[el] };
    }
    return { ...obj };
  }, {});

  const newUser = User({ ...parameters });
  newUser.save((err, user) => {
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.status(201).json({
      user,
    });
  });
});

module.exports = router;
