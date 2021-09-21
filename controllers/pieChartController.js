'use strict'

var pieChartData = require('../models/pieChartDataModel');
var pieChartLabels = require('../models/pieChartLabelsModel');

var controller={

    getPieChartLabels:(req,res)=>{
        pieChartLabels.find({}).exec((err, labels)=>{
            if(err) return res.status(500).send({message:'No se pudo obtener informacion de la Base de Datos'});
            if(!labels) return res.status(404).send({message:'No se encontro Informacion en la Base de Datos'});
            return res.status(200).send({
                data:labels,
                message:'Informacion Enviada con Exito!!!'
            });
        });
    },

    getAllpiedata:(req, res)=>{
        let dataId=req.params.id;
        var labels=  pieChartLabels.findById(dataId,(err,labels)=>{
            if(err) return res.status(500).send({message:'Aun no hay datos'});
            if(!labels) return res.status(404).send({message:'No se encontraron datos'});
            if(labels){
                var chartData=pieChartData.find({chartlabelId:dataId},(err,chartData)=>{
                    if(err) return res.status(500).send({message:'Aun no hay series de datos'});
                    if(!chartData) return res.status(404).send({message:'No se encontraron datos para este ID'});
                    if(chartData){
                        return res.status(200).send({
                            labels: labels,
                            data: chartData,
                            message:'Solicitud recibida y datos entregados'
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
                if(err) return res.status(500).send({message:'Error al guardar en base de datos'});
                if(!pieChartLabelsDB) return res.status(404).send({message:'No se recibieron los datos a guardar'});
                return res.status(200).send({
                    data:pieChartLabelsDB,
                    message:'Datos guardados en Base de Datos exitosamente!!!'
                });
            });
        }else{
            return res.status(200).send({
                message:'No se pudo guardar debido a que ya existe un objeto'
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
            if(err) return res.status(500).send({message:'Error al guardar en base de datos'});
            if(!pieChartDataDB) return res.status(404).send({message:'No se recibieron los datos a guardar'});
            return res.status(200).send({
                data:pieChartDataDB,
                message:'Datos guardados en Base de Datos exitosamente!!!'
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
            if(err) return res.status(505).send({message:'Error  al actualizar'});
            if(!labelsUpdated) return res.status(404).send({message:'No existe  el proyecto para ser actualizado'});
            return res.status(200).send({
                project: labelsUpdated,
                message:'Labels Actualizadas correctamente'
            });
        });   
    },

    deletePieSeries:(req,res)=>{
        let pieId=req.params.id;
        pieChartData.findOneAndRemove({'_id':pieId},(err,seriesDeleted)=>{
            if(err) return res.status(500).send({message:'Error al eliminar'});
            if(!seriesDeleted) return res.status(404).send({message:'No se encontro el elemento en la base de datos'});
            return res.status(200).send({
                seriesDeleted:seriesDeleted,
                message:'Series Deleted Successfully'
            });
        });
    }
};

module.exports = controller;