'use strict'

var tableDataModel = require('../models/tableDataModel');
var tableLabelsModel = require('../models/tableLabelsModel');

var controller={

    getTableLabels:(req,res)=>{
        tableLabelsModel.find({}).exec((err, labels)=>{
            if(err) return res.status(500).send({message:'Could not get information from the Database'});
            if(!labels) return res.status(404).send({message:'No Information Found in the Database'});
            return res.status(200).send({
                data:labels,
                message:'Information Sent Successfully!!!'
            });
        });
    },

    getAllTabledata:(req, res)=>{
        let dataId=req.params.id;
        var labels=  tableLabelsModel.findById(dataId,(err,labels)=>{
            if(err) return res.status(500).send({message:'There is no information in the database'});
            if(!labels) return res.status(404).send({message:'No data found'});
            if(labels){
                var tableData=tableDataModel.find({tableLabelId:dataId},(err,tableData)=>{
                    if(err) return res.status(500).send({message:'No data series yet'});
                    if(!tableData) return res.status(404).send({message:'No data found for this ID'});
                    if(tableData){
                        return res.status(200).send({
                            labels: labels,
                            data: tableData,
                            message:'Request received and data delivered'
                        });
                    }
                });   
            }
        });
    },

    saveTableLabels:(req,res)=>{
        var tableLabels=new tableLabelsModel;
        var labels=req.body;
        tableLabels.header1=labels.header1;
        tableLabels.header2=labels.header2;
        tableLabels.header3=labels.header3;
        
        if(req.body.idLabel===undefined){
            tableLabels.save((err, tableLabelsDB)=>{
                if(err) return res.status(500).send({message:'Failed to save to database'});
                if(!tableLabelsDB) return res.status(404).send({message:'The data to save was not received'});
                return res.status(200).send({
                    data:tableLabelsDB,
                    message:'Data saved in Database successfully!!!'
                });
            });
        }else{
            return res.status(200).send({
                message:'Could not save because an object already exists'
            });
        }
    },

    saveTableData:(req,res)=>{
        var tableData = new tableDataModel;
        var data = req.body;
        tableData.tableLabelId=data.tableLabelId;
        tableData.dataH1= data.dataH1;
        tableData.dataH2= data.dataH2;
        tableData.dataH3= data.dataH3;

        tableData.save((err, tableDataDB)=>{
            if(err) return res.status(500).send({message:'Failed to save to database'});
            if(!tableDataDB) return res.status(404).send({message:'The data to save was not received'});
            return res.status(200).send({
                data:tableDataDB,
                message:'Data saved in Database successfully!!!'
            });
        });
    },

    updateTableLabels:(req,res)=>{
        let updateLabels=req.body;
        let idLabel=updateLabels.idLabel;
        let tableLabels={
            header1:updateLabels.header1,
            header2:updateLabels.header2, 
            header3:updateLabels.header3 
        }
    
        tableLabelsModel.findByIdAndUpdate(idLabel, tableLabels,{new:true},(err,labelsUpdated)=>{
            if(err) return res.status(500).send({message:'Update failed'});
            if(!labelsUpdated) return res.status(404).send({message:'There is no data to be updated'});
            return res.status(200).send({
                project: labelsUpdated,
                message:'Labels Updated correctly'
            });
        });   
    },

    deleteTableData:(req,res)=>{
        let tabledataId=req.params.id;
        tableDataModel.findOneAndRemove({'_id':tabledataId},(err,tableDataDeleted)=>{
            if(err) return res.status(500).send({message:'Delete failed'});
            if(!tableDataDeleted) return res.status(404).send({message:'The item was not found in the database'});
            return res.status(200).send({
                tableDataDeleted:tableDataDeleted,
                message:'Series Deleted Successfully'
            });
        });
    }
};

module.exports = controller;