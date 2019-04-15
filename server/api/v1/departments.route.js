const express = require('express');
const Departments = require('../../models/department.model');

const router = express.Router();

router.route('/departments')
  .get((req, res) => {
    Departments.find()
      .populate('employees', ['firstName', 'lastName', 'position', 'email', 'phone', 'contacts'])
      .exec((err, departments) => {
        if (err) {
          res.status(500).json({
            err,
          });
        }
        res.json(departments);
      });
  })
  .post(async (req, res) => {
    const newDepartment = Departments({
      name: req.body.name,
      position: req.body.position,
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
  })
  .delete((req, res) => {
    const { id } = req.body;
    Departments.findByIdAndDelete(id)
      .exec((err, department) => {
        if (err) {
          res.status(500).json({
            err,
          });
        } else if (!department) {
          res.status(404).json({
            err: 'Department not found',
          });
        }
        res.json({
          deleted: 'Successfully',
        });
      });
  });

router.get('/departments/:id', (req, res) => {
  const { id } = req.params;
  Departments.findById(id)
    .populate('employees', ['firstName', 'lastName'])
    .exec((err, department) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else if (!department) {
        res.status(404).json({
          err: 'Department not found',
        });
      }
      res.json(department);
    });
});
router.post('/departments/users', async (req, res) => {
  const { id } = req.body;
  let added = false;
  const department = await Departments.findById(id);
  department.employees.forEach((item) => {
    if (item._id.toString() === req.body.employees) {
      added = true;
      res.status(404).json({
        err: 'User already added',
      });
    }
  });
  if (!added) department.employees = [...department.employees, req.body.employees];
  department.save((err) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else if (!req.body.id) {
      res.status(404).json({
        err: 'Department not found',
      });
    } else if (!req.body.employees) {
      res.json({
        err: 'You should enter id of employee',
      });
    }
    res.send('User add to department');
  });
});
module.exports = router;
