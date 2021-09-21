'use strict'

var mainChartData = require('../models/mainChartDataModel');
var mainChartLabels = require('../models/mainChartLabelsModel');

var controller={

    getMainChartLabels:(req,res)=>{
        mainChartLabels.find({}).exec((err, labels)=>{
            if(err) return res.status(500).send({message:'Could not get information from Database'});
            if(!labels) return res.status(404).send({message:'No Information Found in the Database'});
            return res.status(200).send({
                data:labels,
                message:'Informacion Enviada con Exito!!!'
            });
        });
    },

    getAlldata:(req, res)=>{
        let dataId=req.params.id;
        var labels=  mainChartLabels.findById(dataId,(err,labels)=>{
            if(err) return res.status(500).send({message:'There is no information in the database'});
            if(!labels) return res.status(404).send({message:'No data found'});
            if(labels){
                var chartData=mainChartData.find({chartlabelId:dataId},(err,chartData)=>{
                    if(err) return res.status(500).send({message:'There is no information in the database'});
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

    saveMainChartData: (req, res)=>{
        let datastr=req.body.data.split(' ');
        var arrData=[];
        for(let i=0; i<datastr.length; i++){
            if(datastr[i]!=''){
                let newNumber=Math.round(parseFloat(datastr[i]).toFixed(1));
                arrData.push(newNumber);
            }
        }
       
        let newArr= JSON.stringify(arrData);
        var chartData = new mainChartData;
        var data = req.body;
        chartData.chartlabelId=data.chartlabelId;
        chartData.name= data.seriesName;
        chartData.data=newArr;
        chartData.target=data.target;

        chartData.save((err, mainChartDataDB)=>{
            if(err) return res.status(500).send({message:'Failed to save to database'});
            if(!mainChartDataDB) return res.status(404).send({message:'The data to save was not received'});
            return res.status(200).send({
                data:mainChartDataDB,
                message:'Data saved successfully!!!'
            });
        });
    },

    saveMainChartLabels: (req, res)=>{
        var chartLabels = new mainChartLabels;
        var labels = req.body;
        chartLabels.title= labels.title;
        chartLabels.subTitle= labels.subTitle;
        chartLabels.labelXAxis= labels.labelXAxis;
        chartLabels.labelYAxis= labels.labelYAxis;
        chartLabels.toolTip= labels.toolTip;
        chartLabels.categories= labels.categories;
        
        if(req.body.idLabel===undefined){
            chartLabels.save((err, mainchartLabelsDB)=>{
                if(err) return res.status(500).send({message:'Failed to save to database'});
                if(!mainchartLabelsDB) return res.status(404).send({message:'The data to save was not received'});
                return res.status(200).send({
                    data:mainchartLabelsDB,
                    message:'Data saved successfully!!!'
                });
            });
        }else{
            return res.status(200).send({
                message:'Could not save because an object already exists'
            });
        }
    },

    updateMainChartLabels:(req,res)=>{
        let updateLabels=req.body;
        let idLabel=updateLabels._id;
        let chartLabels={
            title:updateLabels.title,
            subTitle:updateLabels.subTitle, 
            labelXAxis:updateLabels.labelXAxis, 
            labelYAxis:updateLabels.labelYAxis, 
            toolTip:updateLabels.toolTip,
            categories:updateLabels.categories,
        }
    
        mainChartLabels.findByIdAndUpdate(idLabel, chartLabels,{new:true},(err,labelsUpdated)=>{
            if(err) return res.status(505).send({message:'Update failed'});
            if(!labelsUpdated) return res.status(404).send({message:'The project does not exist to be updated'});
            return res.status(200).send({
                project: labelsUpdated,
                message:'Labels Updated correctly'
            });
        });
    },

    deleteSeries:(req,res)=>{
        let seriesId=req.params.id;
        mainChartData.findOneAndRemove({'_id':seriesId},(err,seriesDeleted)=>{
            if(err) return res.status(500).send({message:'Delete failed'});
            if(!seriesDeleted) return res.status(404).send({message:'The item was not found in the database'});
            return res.status(200).send({
                seriesDeleted:seriesDeleted,
                message:'Series Deleted Successfully'
            });
        });
    },

    getdataCards:(req,res)=>{
        mainChartData.find({}).exec((err,data)=>{
            if(err) return res.status(500).send({message:'Could not get information from Database'});
            if(!data) return res.status(404).send({message:'No Information Found in the Database'});
            return res.status(200).send({
                data:data,
                message:'Information Sent Successfully!!!'
            });
        });
    },

};

module.exports = controller;