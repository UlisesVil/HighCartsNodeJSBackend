'use strict'

var pieChartData = require('../models/pieChartDataModel');
var pieChartLabels = require('../models/pieChartLabelsModel');

var controller={

    getPieChartLabels:(req,res)=>{
        pieChartLabels.find({}).exec((err, labels)=>{
            if(err) return res.status(500).send({message:'Could not get information from the Database'});
            if(!labels) return res.status(404).send({message:'No Information Found in the Database'});
            return res.status(200).send({
                data:labels,
                message:'Information Sent Successfully!!!'
            });
        });
    },

    getAllpiedata:(req, res)=>{
        let dataId=req.params.id;
        var labels=  pieChartLabels.findById(dataId,(err,labels)=>{
            if(err) return res.status(500).send({message:'There is no information in the database'});
            if(!labels) return res.status(404).send({message:'No data found'});
            if(labels){
                var chartData=pieChartData.find({chartlabelId:dataId},(err,chartData)=>{
                    if(err) return res.status(500).send({message:'No data series yet'});
                    if(!chartData) return res.status(404).send({message:'No data found for this ID'});
                    if(chartData){
                        return res.status(200).send({
                            labels: labels,
                            data: chartData,
                            message:'Request received and data delivered'
                        });
                    }
                });   
            }
        });
    },

    savePieChartLabels:(req,res)=>{
        var pieLabels = new pieChartLabels;
        var labels = req.body;
        pieLabels.title= labels.title;
        pieLabels.valueSufix= labels.valueSufix;
        pieLabels.seriesName= labels.seriesName;

        if(req.body.idLabel===undefined){
            pieLabels.save((err, pieChartLabelsDB)=>{
                if(err) return res.status(500).send({message:'Failed to save to database'});
                if(!pieChartLabelsDB) return res.status(404).send({message:'The data to save was not received'});
                return res.status(200).send({
                    data:pieChartLabelsDB,
                    message:'Data saved in Database successfully!!!'
                });
            });
        }else{
            return res.status(200).send({
                message:'Could not save because an object already exists'
            });
        }
    },

    savePieChartData:(req,res)=>{
        var chartData = new pieChartData;
        var data = req.body;
        chartData.chartlabelId=data.chartlabelId;
        chartData.pieceName= data.pieceName;
        chartData.percentage=data.percentage;

        chartData.save((err, pieChartDataDB)=>{
            if(err) return res.status(500).send({message:'Failed to save to database'});
            if(!pieChartDataDB) return res.status(404).send({message:'The data to save was not received'});
            return res.status(200).send({
                data:pieChartDataDB,
                message:'Data saved in Database successfully!!!'
            });
        });
    },

    updatePieChartLabels:(req,res)=>{
        let updateLabels=req.body;
        let idLabel=updateLabels._id;
        let chartLabels={
            title:updateLabels.title,
            valueSufix:updateLabels.valueSufix, 
            seriesName:updateLabels.seriesName 
        }
    
        pieChartLabels.findByIdAndUpdate(idLabel, chartLabels,{new:true},(err,labelsUpdated)=>{
            if(err) return res.status(505).send({message:'Update failed'});
            if(!labelsUpdated) return res.status(404).send({message:'There is no data to be updated'});
            return res.status(200).send({
                project: labelsUpdated,
                message:'Labels Updated correctly'
            });
        });   
    },

    deletePieSeries:(req,res)=>{
        let pieId=req.params.id;
        pieChartData.findOneAndRemove({'_id':pieId},(err,seriesDeleted)=>{
            if(err) return res.status(500).send({message:'Delete failed'});
            if(!seriesDeleted) return res.status(404).send({message:'The item was not found in the database'});
            return res.status(200).send({
                seriesDeleted:seriesDeleted,
                message:'Series Deleted Successfully'
            });
        });
    }
};

module.exports = controller;