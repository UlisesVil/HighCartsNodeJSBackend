'use strict'

var express= require('express');
var tableController= require('../controllers/tableController');
var router= express.Router();

router.get('/getTableLabels',tableController.getTableLabels);
router.get('/getAllTabledata/:id',tableController.getAllTabledata);
router.post('/saveTableLabels',tableController.saveTableLabels);
router.post('/saveTableData', tableController.saveTableData);
router.put('/updateTableLabels', tableController.updateTableLabels);
router.delete('/deleteTableData/:id',tableController.deleteTableData);

module.exports = router;