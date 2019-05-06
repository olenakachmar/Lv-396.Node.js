const express = require('express');
const usersRouter = require('./users.route');
const upload = require('../../../config/multer');
const authRouter = require('./auth.route');
const departmentsRouter = require('./departments.route');
const issuesRouter = require('./issues.route');
const passport = require('../../../config/passport');

const router = express.Router();

router.use('/users', passport.authenticate('jwt', {
  session: false,
}), upload.single('avatar'), usersRouter);

router.use('/departments', passport.authenticate('jwt', {
  session: false,
}), departmentsRouter);

router.use('/issues', passport.authenticate('jwt', {
  session: false,
}), issuesRouter);

router.use('/auth', authRouter);

module.exports = router;
