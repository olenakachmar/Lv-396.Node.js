const express = require('express');
const url = require('url');
const Issues = require('../../models/issue.model');
const config = require('../../config/config');

const router = express.Router();

const arrKeys = config.arrKeysIssues;

router.route('/issues')
  .get((req, res) => {
    const { query } = url.parse(req.url, true);
    const { status, type, date } = query;
    Issues.find({ $or: [{ status }, { type }, { date }] })
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
  .post(async (req, res) => {
    const newIssue = Issues({
      name: req.body.name,
      excerpt: req.body.excerpt,
      status: req.body.status,
      type: req.body.type,
      date: new Date().getTime(),
      author: req.body.author,
      content: req.body.content,
      assignTo: req.body.assignTo,
    });
    await newIssue.save((err) => {
      if (err) {
        res.json({
          error: err,
        });
        res.end();
      }
      res.json({
        added: 'Successfully',
      });
    });
  })
  .put((req, res) => {
    const { id } = req.body;
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
    Issues.findByIdAndUpdate(id, user, { new: true })
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
        res.json({
          updated: 'Successfully',
        });
      });
  })
  .delete((req, res) => {
    const { id } = req.body;
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
        res.json({
          deleted: 'Successfully',
        });
      });
  });
router.get('/issues/all', (req, res) => {
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
      res.json(issues);
    });
});
router.put('/issues/resolve', async (req, res) => {
  const { id } = req.body;
  const { userId } = req.body;
  const issues = await Issues.findById(id);
  let resolve;
  if (userId === issues.author.toString()) {
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
      res.json({
        updated: 'Successfully',
      });
    });
});

module.exports = router;
