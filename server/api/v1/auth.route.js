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
      res.status(404).json({ err: 'User not found' });
    } else if (user.checkPassword(req.body.password)) {
      res.json({ token: jwt.sign({ id: user._id, type: user.type }, JWT_SECRET, {}) });
    } else {
      res.status(400).json({ err: 'passwords don\'t match' });
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
  let {
    contactName,
    contactValue,
  } = req.body;

  if (contactName && contactValue) {
    contactValue = Array.isArray(contactValue) ? contactValue : Array(contactValue);
    contactName = Array.isArray(contactName) ? contactName : Array(contactName);

    const contacts = contactName.reduce((obj, el, idx) => {
      if (contactValue[idx]) {
        return [...obj, { contact_name: el, contact_value: contactValue[idx] }];
      }
      return [...obj];
    }, []);

    newUser.contacts = [...contacts];
  } else {
    res.status(400).json({
      err: 'Contact value or contact name not specified',
    });
  }
  let {
    dateTopic,
    date,
  } = req.body;
  if (dateTopic && date) {
    dateTopic = Array.isArray(dateTopic) ? dateTopic : Array(dateTopic);
    date = Array.isArray(date) ? date : Array(date);

    const dates = dateTopic.reduce((obj, el, idx) => {
      if (date[idx]) {
        return [...obj, { topic: el, date: Date(date[idx]) }];
      }
      return [...obj];
    }, []);

    newUser.dates = [...dates];
  } else {
    res.status(400).json({
      err: 'Date topic or date not specified',
    });
  }

  newUser.save()
    .then(() => {
      res.status(201).json({
        newUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
});

module.exports = router;
