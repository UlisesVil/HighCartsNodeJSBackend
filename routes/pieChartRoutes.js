'use strict'

var express= require('express');
var pieChartController= require('../controllers/pieChartController');

var router = express.Router();



router.post('/savePieChartLabels', pieChartController.savePieChartLabels);
router.post('/savePieChartData', pieChartController.savePieChartData);
router.put('/updatePieChartLabels', pieChartController.updatePieChartLabels);
router.get('/getPieChartLabels', pieChartController.getPieChartLabels);
router.get('/getAllpiedata/:id', pieChartController.getAllpiedata);
router.delete('/deletePieSeries/:id', pieChartController.deletePieSeries);




module.exports= router;