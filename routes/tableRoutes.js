'use strict'

var express= require('express');
var tableController= require('../controllers/tableController');

var router= express.Router();

router.post('/saveTableLabels',tableController.saveTableLabels);
router.put('/updateTableLabels', tableController.updateTableLabels);
router.post('/saveTableData', tableController.saveTableData);
router.get('/getTableLabels',tableController.getTableLabels);
router.get('/getAllTabledata/:id',tableController.getAllTabledata);
router.delete('/deleteTableData/:id',tableController.deleteTableData);







module.exports = router;