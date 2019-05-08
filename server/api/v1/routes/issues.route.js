const express = require('express');
const controller = require('../controllers/IssuesController');

const router = express.Router();

router.route('/issues')
  .get(controller.getOneByQuery)
  .post(controller.createOne)
  .put(controller.updateOne);

router.delete('/:id', controller.deleteOne);

router.get('/all', controller.getAll);

router.put('/resolve', controller.updateForResolve);

module.exports = router;
