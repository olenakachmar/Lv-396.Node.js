const express = require('express');
const url = require('url');
const Issues = require('../../models/issue.model');
const config = require('../../config/config');
const passport = require('../../config/passport');

const router = express.Router();

const arrKeys = config.arrKeysIssues;

router.route('/issues')
  .get(passport.authenticate('jwt', { session: false }), (req, res) => {
    const { query } = url.parse(req.url, true);
    const { status, type, date } = query;
    Issues.find({ $or: [{ 'status.name': status }, { 'type.name': type }, { date }] })
      .populate('assignTo', ['firstName', 'lastName'])
      .populate('author', ['firstName', 'lastName'])
      .exec((err, issues) => {
        if (err) {
          res.status(500).json({
            err,
          });
        } else if (!status && !type && !date) {
          res.status(404).json({
            err: 'Issue not found',
          });
        }
        res.json(issues);
      });
  })
  .post(passport.authenticate('jwt', { session: false }), (req, res) => {
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
    const newIssue = Issues({
      ...parameters,
      status: {
        name: req.body.statusName,
        value: req.body.statusValue,
      },
      type: {
        name: req.body.typeName,
        value: req.body.typeValue,
      },
      date: new Date().getTime(),
    });
    newIssue.save()
      .then(() => {
        res.status(201).json({
          id: newIssue._id,
        });
      })
      .catch((err) => {
        res.status(500).json({
          err,
        });
      });
  })
  .put(passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.body;
    const parameters = arrKeys.reduce((obj, el) => {
      if (req.body[el]) {
        if (el === 'statusName' || el === 'statusValue') {
          if (req.body.statusName && req.body.statusValue) {
            return {
              ...obj,
              status: {
                name: req.body.statusName,
                value: req.body.statusValue,
              },
            };
          }
        }
        if (el === 'typeName' || el === 'typeValue') {
          if (req.body.typeName && req.body.typeValue) {
            return {
              ...obj,
              type: {
                name: req.body.typeName,
                value: req.body.typeValue,
              },
            };
          }
        }
        return {
          ...obj,
          [el]: req.body[el],
        };
      }
      return {
        ...obj,
      };
    }, {});
    Issues.findByIdAndUpdate(id, parameters, { new: true })
      .exec((err, issue) => {
        if (err) {
          res.status(500).json({
            err,
          });
        } else if (!issue) {
          res.status(404).json({
            err: 'Issue not found',
          });
        } else if (!req.body.assignTo || !req.body.reassigned) {
          res.json({
            err: 'You should enter assignTo and reassigned options',
          });
        }
        res.status(200).json({
          updated: 'Successfully',
        });
      });
  });
router.get('/issues/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  Issues.find()
    .populate('assignTo', ['firstName', 'lastName'])
    .populate('author', ['firstName', 'lastName'])
    .populate('reassigned', ['firstName', 'lastName'])
    .exec((err, issues) => {
      if (err) {
        res.status(500).json({
          err,
        });
      }
      res.status(200).json(issues);
    });
});
router.get('/issues/:userId', (req, res) => {
  const { userId } = req.params;
  const author = userId;
  const assignTo = userId;
  Issues.find({ $or: [{ author }, { assignTo }] })
    .populate('employees', ['firstName', 'lastName'])
    .exec((err, issue) => {
      if (err) {
        res.status(500).json({
          err,
        });
      }
      res.status(200).json(issue);
    });
});

router.put('/issues/resolve', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.body;
  const { userId } = req.body;
  const issues = await Issues.findById(id);
  let resolve;
  if (userId === issues.author.toString() && userId === issues.assignTo.toString()) {
    resolve = {
      resolvedByAuthor: true,
      resolvedByPerformer: true,
    };
  } else if (userId === issues.author.toString()) {
    resolve = { resolvedByAuthor: true };
  } else if (userId === issues.assignTo.toString()) {
    resolve = { resolvedByPerformer: true };
  }

  Issues.findByIdAndUpdate(id, resolve, { new: true })
    .exec((err, issue) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else if (!issue) {
        res.status(404).json({
          err: 'Issue not found',
        });
      } else if (!req.body.userId) {
        res.json({
          err: 'You should enter userId',
        });
      }
      res.status(200).json({
        updated: 'Successfully',
      });
    });
});
router.delete('/issues/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;
  Issues.findByIdAndDelete(id)
    .exec((err, issue) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else if (!issue) {
        res.status(404).json({
          err: 'Issue not found',
        });
      }
      res.status(200).json({
        deleted: 'Successfully',
      });
    });
});

module.exports = router;
