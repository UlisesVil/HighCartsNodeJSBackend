'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var tableDataSchema=Schema({
    tableLabelId:{
        type:String,
        required:true
    },
    dataH1:{
        type:String,
        required:true
    },
    dataH2:{
        type:String,
        required:true
    },
    dataH3:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('tableData',tableDataSchema);