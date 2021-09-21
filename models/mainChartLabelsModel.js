'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var mainChartLabelSchema=Schema({
    title:{
        type:String
    },
    subTitle:{
        type:String
    }, 
    labelXAxis:{
        type:String
    }, 
    labelYAxis:{
        type:String
    }, 
    toolTip:{
        type:String
    },
    categories:{
        type:Array
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('mainChartLabel',mainChartLabelSchema);