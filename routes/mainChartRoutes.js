'use strict'

var express= require('express');
var mainChartDataController= require('../controllers/mainChartController');

var router = express.Router();



router.post('/saveMainChartData', mainChartDataController.saveMainChartData);
router.get('/getdataCards', mainChartDataController.getdataCards);
router.post('/saveMainChartLabels', mainChartDataController.saveMainChartLabels);
router.get('/getMainChartLabels/:id?', mainChartDataController.getMainChartLabels);
router.put('/updateMainChartLabels', mainChartDataController.updateMainChartLabels);

router.get('/getAlldata/:id', mainChartDataController.getAlldata);
router.delete('/deleteSeries/:id', mainChartDataController.deleteSeries);




module.exports= router;