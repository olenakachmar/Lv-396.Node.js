const express = require('express');
const Departments = require('../../models/department.model');

const router = express.Router();

router.route('/departments')
  .get(async (req, res) => {
    await Departments.find().populate('employees', ['firstName', 'lastName'])
      .exec((err, departments) => {
        if (err) {
          res.status(500).json({ err });
        }
        res.json(departments);
      });
  })
  .post(async (req, res) => {
    const newDepartment = Departments({
      name: req.body.name,
    });
    await newDepartment.save((err) => {
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
  });
router.get('/departments/:id', async (req, res) => {
  const { id } = req.params;
  await Departments.findById(id, (err, department) => {
    if (err) {
      res.status(500).json({ err });
    } else if (!department) {
      res.status(404).json({ err: 'Department not found' });
    }
    res.json(department);
  }).populate('employees');
});
router.post('/departments/users', async (req, res) => {
  const { id } = req.body;
  const department = await Departments.findById(id);
  department.employees = [...department.employees, req.body.employees];
  department.save((err) => {
    if (err) {
      res.status(500).json({ err });
    } else if (!req.body.id) {
      res.status(404).json({ err: 'Department not found' });
    } else if (!req.body.employees) {
      res.json({
        err: 'You should enter id of employee',
      });
    }
    res.send('User add to department');
  });
});
module.exports = router;
