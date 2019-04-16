const express = require('express');
const passport = require('../../config/passport');
const User = require('../../models/user.model');
const upload = require('../../config/multer');
const config = require('../../config/config');
const cloudinary = require('../../config/cloudinary');

const { arrKeys } = config;

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
  }), upload.single('avatar'), (req, res) => {
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

    let {
      contactName,
      contactValue,
    } = req.body;

    if (contactName && contactValue) {
      contactValue = Array.isArray(contactValue) ? contactValue : Array(contactValue);
      contactName = Array.isArray(contactName) ? contactName : Array(contactName);

      const contacts = contactName.reduce((obj, el, idx) => {
        if (contactValue[idx]) {
          return [...obj, {
            contact_name: el,
            contact_value: contactValue[idx],
          }];
        }
        return [...obj];
      }, []);

      user.contacts = [...contacts];
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
          return [...obj, {
            topic: el,
            date: new Date(date[idx]),
          }];
        }
        return [...obj];
      }, []);

      user.dates = [...dates];
    }

    if (req.file) {
      user.photoURL = req.file.url;
      user.photoID = req.file.public_id;
    }

    User.findById(id, (err, doc) => {
      if (!doc) {
        res.status(404).json({
          err: 'User not found',
        });
        return 0;
      }
      if (user.photoID) {
        cloudinary.v2.api.delete_resources(user.photoID);
      }
      Object.assign(doc, user);
      doc.save();
      res.json(doc);
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

router.put('/users/watched_issues', async (req, res) => {
  const {
    id,
    issueID,
  } = req.body;
  try {
    const user = await User.findById(id).exec();
    if (user.watched_issues.toString().split(',').includes(issueID)) {
      res.status(400).json({
        err: 'Array already includes this issue',
      });
      return 0;
    }
    user.watched_issues = [...user.watched_issues, issueID];
    await user.save();
    res.json({
      success: 'updated',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err,
    });
  }
});

router.post('/users/change_avatar', upload.single('avatar'), async (req, res) => {
  const {
    id,
  } = req.body;
  try {
    const user = await User.findById(id);
    await cloudinary.v2.api.delete_resources(user.photoID);
    user.photoURL = req.file.url;
    user.photoID = req.file.public_id;
    await user.save();
    res.json(req.file);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

module.exports = router;
