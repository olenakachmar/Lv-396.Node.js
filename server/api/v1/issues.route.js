const express = require('express');
const url = require('url');
const Moment = require('moment');
const Issues = require('../../models/issue.model');

const router = express.Router();

router.get('/list', (req, res) => {
  const { query } = url.parse(req.url, true);
  const { priority, type } = query;

  Issues.find({ $or: [{ priority }, { type }] },
    (err, issues) => {
      if (err) {
        res.status(500).json({ err });
      } else if (!issues) {
        res.status(404).json({ err: 'Issue not found' });
      } else {
        res.json(issues);
      }
    }).populate(['assignTo', 'ownerID']);
});

router.post('/add', (req, res) => {
  if (req.body.title && req.body.type
      && req.body.priority && req.body.value
      && req.body.assignTo && req.body.ownerID) {
    const newIssue = Issues({
      title: req.body.title,
      type: req.body.type,
      created: new Moment().subtract(10, 'days').calendar(),
      priority: req.body.priority,
      assignTo: req.body.assignTo,
      value: req.body.value,
      ownerID: req.body.ownerID,
    });
    newIssue.save((err, issue) => {
      if (err) {
        res.json({
          error: err,
        });
        res.end();
      }
      res.status(201).json({
        issue,
      });
    });
  } else {
    res.status(400).json({
      err: 'You must provide all required parameters',
      required: 'title, type, priority, value, assignTo, ownerID',
    });
  }
});
module.exports = router;
