'use strict'

var express= require('express');
var mainChartDataController= require('../controllers/mainChartController');
var router = express.Router();

//MainChart
router.get('/getMainChartLabels/:id?', mainChartDataController.getMainChartLabels);
router.get('/getAlldata/:id', mainChartDataController.getAlldata);
router.post('/saveMainChartData', mainChartDataController.saveMainChartData);
router.post('/saveMainChartLabels', mainChartDataController.saveMainChartLabels);
router.put('/updateMainChartLabels', mainChartDataController.updateMainChartLabels);
router.delete('/deleteSeries/:id', mainChartDataController.deleteSeries);
//Cards
router.get('/getdataCards', mainChartDataController.getdataCards);

module.exports= router;