const express = require('express');
const controller = require('../controllers/DepartmentsController');

const router = express.Router();

router.route('/departments')
  .get(controller.getAll)
  .post(controller.createOne)
  .delete(controller.deleteOne);

router.get('/departments/:id', controller.getOne);
router.post('/departments/users', controller.addEmployee);
module.exports = router;
