const express = require('express');
const url = require('url');
const Issues = require('../../models/issue.model');

const router = express.Router();

router.route('/issues')
  .get(async (req, res) => {
    const { query } = url.parse(req.url, true);
    const { priority, type, date } = query;
    await Issues.find({ $or: [{ priority }, { type }, { created: date }] },
      (err, issues) => {
        if (err) {
          res.status(500).json({ err });
        } else if (!priority && !type && !date) {
          res.status(404).json({ err: 'Issue not found' });
        }
        res.json(issues);
      }).populate(['assignTo', 'ownerID']);
  })
  .post(async (req, res) => {
    const newIssue = Issues({
      title: req.body.title,
      type: req.body.type,
      priority: req.body.priority,
      created: new Date().getTime(),
      assignTo: req.body.assignTo,
      value: req.body.value,
      ownerID: req.body.ownerID,
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
      title: req.body.title,
      priority: req.body.priority,
      assignTo: req.body.assignTo,
      value: req.body.value,
      reassigned: req.body.reassigned,
    }, { new: true }, (err) => {
      if (err) {
        res.status(500).json({ err });
      } else if (!id) {
        res.status(404).json({ err: 'Issue not found' });
      } else if (!req.body.title || !req.body.priority
          || !req.body.assignTo || !req.body.value || !req.body.reassigned) {
        res.status(404).json({
          err: 'You should enter required parameters',
          required: 'title, priority, assignTo, value, reassigned',
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
  await Issues.find().populate(['assignTo', 'ownerID'])
    .exec((err, issues) => {
      if (err) {
        res.status(500).json({ err });
      }
      res.json(issues);
    });
});

module.exports = router;
