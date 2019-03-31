const express = require('express');
const url = require('url');
const Issues = require('../../models/issue.model');

const router = express.Router();

router.get('/list', async (req, res) => {
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
});

router.post('/add', async (req, res) => {
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
    res.status(201).send('Issue added');
  });
});
module.exports = router;
