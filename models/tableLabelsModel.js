'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var tableLabelSchema=Schema({
    header1:{
        type:String
    },
    header2:{
        type:String
    }, 
    header3:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
});


module.exports=mongoose.model('tableLabel',tableLabelSchema);