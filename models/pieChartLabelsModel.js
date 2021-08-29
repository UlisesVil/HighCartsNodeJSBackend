'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var pieChartLabelSchema=Schema({
    title:{
        type:String
    },
    valueSufix:{
        type:String
    }, 
    seriesName:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
});


module.exports=mongoose.model('pieChartLabel',pieChartLabelSchema);