const express = require('express');
const router = express.Router();

const itemController = require('../controller/itemController');

router.get('/users', itemController.getData);
router.post('/users', itemController.addData);
router.delete('/users/:id', itemController.deleteData);
router.put('/users/:id', itemController.editData);

module.exports = router;
