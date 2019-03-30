const express = require('express');
const passport = require('../../config/passport');
const User = require('../../models/user.model');
const config = require('../../config/config');

const { arrKeys } = config;

const router = express.Router();

router.route('/users')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find()
      .populate('manager')
      .populate('teamlead')
      .populate('deparment', 'name')
      .exec((err, users) => {
        if (err) {
          res.status(500).json({ err });
        }
        res.json(users);
      });
  })
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.body;
    User.deleteOne({ _id: id }, (err, user) => {
      if (err) {
        res.status(500).json({ err });
      } else if (!user) {
        res.status(404).json({ err: 'User not found' });
      } else {
        res.json({
          deleted: 'Succesfully',
        });
      }
    });
  })
  .put(passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.body;
    const user = arrKeys.reduce((obj, el) => {
      if (req.body[el]) {
        return { ...obj, [el]: req.body[el] };
      }
      return { ...obj };
    }, {});

    User.findById(id, (err, doc) => {
      if (!doc) {
        res.status(404).json({ err: 'User not found' });
      } else {
        doc = { ...doc, ...user };
        doc.save();
        res.json(doc);
      }
    });
  });

router.get('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(500).json({ err });
    } else if (!user) {
      res.status(404).json({ err: 'User not found' });
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
