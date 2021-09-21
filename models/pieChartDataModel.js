'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var pieChartDataSchema=Schema({
    chartlabelId:{
        type:String,
        required:true
    },
    pieceName:{
        type:String,
        required:true
    },
    percentage:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('pieChartData',pieChartDataSchema);