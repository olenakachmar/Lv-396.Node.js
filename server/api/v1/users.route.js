const express = require('express');
const passport = require('../../config/passport');
const User = require('../../models/user.model');
const config = require('../../config/config');

const {
  arrKeys,
} = config;

const router = express.Router();

router.route('/users')
  .get(passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    User.find()
      .populate('manager')
      .populate('teamlead')
      .populate('deparment', 'name')
      .exec((err, users) => {
        if (err) {
          res.status(500).json({
            err,
          });
        }
        res.json(users);
      });
  })

  .delete(passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    const {
      id,
    } = req.body;
    User.deleteOne({
      _id: id,
    }, (err, user) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else if (!user) {
        res.status(404).json({
          err: 'User not found',
        });
      } else {
        res.json({
          deleted: 'Succesfully',
        });
      }
    });
  })

  .put(passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    const {
      id,
    } = req.body;
    const user = arrKeys.reduce((obj, el) => {
      if (req.body[el]) {
        return {
          ...obj,
          [el]: req.body[el],
        };
      }
      return {
        ...obj,
      };
    }, {});

    User.findById(id, (err, doc) => {
      if (!doc) {
        res.status(404).json({
          err: 'User not found',
        });
      } else {
        Object.assign(doc, user);
        doc.save();
        res.json(doc);
      }
    });
  });

router.get('/users/:id', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  const { id } = req.params;
  User.findById(id).populate('manager').populate('teamlead').populate('department')
    .exec((err, user) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else if (!user) {
        res.status(404).json({
          err: 'User not found',
        });
      } else {
        res.json(user);
      }
    });
});

const updateContacts = (req, res) => {
  const {
    id,
  } = req.body;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          err: 'User not found ',
        });
      }

      let {
        contactName,
        contactValue,
      } = req.body;

      if (contactName && contactValue) {
        contactValue = Array.isArray(contactValue) ? contactValue : Array(contactValue);
        contactName = Array.isArray(contactName) ? contactName : Array(contactName);

        const contacts = contactName.reduce((obj, el, idx) => {
          let changed = 0;
          if (contactValue[idx]) {
            user.contacts.map((contact) => {
              if (contact.contact_name === el) {
                contact.contact_value = contactValue[idx];
                changed = 1;
              }
              return contact;
            });
            if (changed) {
              return [...obj];
            }
            return [...obj, { contact_name: el, contact_value: contactValue[idx] }];
          }
          return [...obj];
        }, []);

        user.contacts = [...user.contacts, ...contacts];
        user.save();
        res.json(user);
      } else {
        res.status(400).json({
          err: 'Contact value or contact name not specified',
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

router.put('/users/contacts', passport.authenticate('jwt', { session: false }), updateContacts);

module.exports = router;
