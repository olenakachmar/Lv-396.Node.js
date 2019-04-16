const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const smtpTransport = require('../../config/smtpTransport');
const upload = require('../../config/multer');
const User = require('../../models/user.model');
const {
  JWT_SECRET,
  smtpEmail,
  arrKeys,
  frontURI,
} = require('../../config/config');

const router = express.Router();

router.post('/login', (req, res) => {
  const {
    login,
  } = req.body;
  User.findOne({
    login,
  }, (err, user) => {
    if (err || !user) {
      res.status(404).json({
        err: 'User not found',
      });
    } else if (user.checkPassword(req.body.password)) {
      res.json({
        token: jwt.sign({
          id: user._id,
          type: user.type,
        }, JWT_SECRET, {}),
      });
    } else {
      res.status(400).json({
        err: 'passwords don\'t match',
      });
    }
  });
});

router.post('/signup', upload.single('avatar'), (req, res) => {
  const parameters = arrKeys.reduce((obj, el) => {
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

  if (!parameters.login) {
    parameters.login = `${parameters.firstName.toLowerCase()[0]}${parameters.lastName.toLowerCase().substring(0, 5)}hrms`;
  }
  if (!parameters.password) {
    parameters.password = crypto.randomBytes(4).toString('hex');
  }

  const newUser = User({
    ...parameters,
  });
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

    newUser.contacts = [...contacts];
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

    newUser.dates = [...dates];
  }

  if (req.file) {
    newUser.photoURL = req.file.url;
    newUser.photoID = req.file.public_id;
  }

  const mailData = {
    to: newUser.email,
    from: smtpEmail,
    template: 'create-user-email',
    subject: 'Registration in HRMS',
    context: {
      name: newUser.firstName,
      login: newUser.login,
      password: newUser.password,
    },
  };

  Promise.all([newUser.save(), smtpTransport.sendMail(mailData)])
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

// eslint-disable-next-line consistent-return
router.post('/forgot_password', async (req, res) => {
  const {
    email,
  } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      res.status(404).json({
        err: 'User not found',
      });
      return 0;
    }
    const token = crypto.randomBytes(20).toString('hex');

    user = await User.findByIdAndUpdate(user._id, {
      reset_password_token: token,
      reset_password_expires: Date.now() + 86400000,
    }, {
        upsert: true,
        new: true,
      }).exec();
    const data = {
      to: user.email,
      from: smtpEmail,
      template: 'forgot-password-email',
      subject: 'Password help has arrived!',
      context: {
        url: `${frontURI}/reset-password?token=${token}`,
        name: user.firstName,
      },
    };
    await smtpTransport.sendMail(data);
    res.json({
      msg: 'Email sent',
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post('/recover_password', async (req, res) => {
  const {
    token,
    newPass,
  } = req.body;
  try {
    const user = await User.findOne({
      reset_password_token: token,
      reset_password_expires: {
        $gt: Date.now(),
      },
    }).exec();

    if (!user) {
      res.status(404).json({
        err: 'Reset password link is invalid or expired',
      });
      return 0;
    }

    user.password = newPass;
    user.reset_password_token = undefined;
    user.reset_password_expires = undefined;

    await user.save();

    const data = {
      to: user.email,
      from: smtpEmail,
      template: 'reset-password-email',
      subject: 'Password Reset Confirmation',
      context: {
        name: user.firstName,
      },
    };

    await smtpTransport.sendMail(data);

    res.json({
      msg: 'Changed succesfully',
    });
  } catch (err) {
    res.status(500).json({ err });
  }
  return 0;
});

router.post('/validate_recovery', async (req, res) => {
  const {
    token,
  } = req.body;
  try {
    const user = await User.findOne({
      reset_password_token: token,
      reset_password_expires: {
        $gt: Date.now(),
      },
    }).exec();

    if (!user) {
      res.status(404).json({
        err: 'Reset password link is invalid or expired',
      });
      return 0;
    }

    res.json({
      validate: 'Success',
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
