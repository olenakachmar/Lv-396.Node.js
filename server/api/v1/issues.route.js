const express = require('express');
const url = require('url');
const Issues = require('../../models/issue.model');

const router = express.Router();

router.route('/issues')
  .get(async (req, res) => {
    const { query } = url.parse(req.url, true);
    const { status, type, date } = query;

    await Issues.find({ $or: [{ status }, { type }, { date }] },
      (err, issues) => {
        if (err) {
          res.status(500).json({ err });
        } else if (!status && !type && !date) {
          res.status(404).json({ err: 'Issue not found' });
        }
        res.json(issues);
      })
      .populate('assignTo', ['firstName', 'lastName'])
      .populate('author', ['firstName', 'lastName']);
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
  .put(async (req, res) => {
    const { id } = req.body;
    await Issues.findByIdAndUpdate(id, {
      name: req.body.name,
      excerpt: req.body.excerpt,
      status: req.body.status,
      content: req.body.content,
      assignTo: req.body.assignTo,
      reassigned: req.body.reassigned,
    }, { new: true }, (err) => {
      if (err) {
        res.status(500).json({ err });
      } else if (!id) {
        res.status(404).json({ err: 'Issue not found' });
      } else if (!req.body.name || !req.body.status || !req.body.excerpt
          || !req.body.assignTo || !req.body.content || !req.body.reassigned) {
        res.json({
          err: 'You should enter required parameters',
          required: 'name, status, assignTo, content, reassigned, excerpt',
        });
      }
      res.json({
        updated: 'Successfully',
      });
    });
  })
  .delete(async (req, res) => {
    const { id } = req.body;
    await Issues.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).json({ err });
      } else if (!id) {
        res.status(404).json({ err: 'Issue not found' });
      }
      res.json({
        deleted: 'Successfully',
      });
    });
  });
router.get('/issues/all', async (req, res) => {
  await Issues.find()
    .populate('assignTo', ['firstName', 'lastName'])
    .populate('author', ['firstName', 'lastName'])
    .exec((err, issues) => {
      if (err) {
        res.status(500).json({ err });
      }
      res.json(issues);
    });
});

module.exports = router;
