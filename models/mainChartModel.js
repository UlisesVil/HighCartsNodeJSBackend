'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var mainChartDataSchema=Schema({
    chartlabelId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    data:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('mainChartData',mainChartDataSchema);