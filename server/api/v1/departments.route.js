const express = require('express');
const Department = require('../../models/department.model');

const router = express.Router();


router.get('/:title', (req, res) => {
  const { title } = req.params;
  Department.findOne({ title }, (err, department) => {
    if (err) {
      res.status(500).json({ err });
    } else if (!department) {
      res.status(404).json({ err: 'Department not found' });
    } else {
      res.json(department);
    }
  }).populate('employees');
});
router.post('', async (req, res) => {
  if (req.body.title && req.body.employees) {
    const department = await Department.findOne({ title: req.body.title });
    department.employees = [...department.employees, req.body.employees];
    department.save((err) => {
      if (err) {
        res.json({
          error: err,
        });
        res.end();
      }
      res.status(201).send('User added to department');
    });
  } else {
    res.json({
      err: 'You should enter title of department and id of employee',
    });
  }
});

module.exports = router;
