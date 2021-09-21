'use strict'

var tableDataModel = require('../models/tableDataModel');
var tableLabelsModel = require('../models/tableLabelsModel');

var controller={

    getTableLabels:(req,res)=>{
        tableLabelsModel.find({}).exec((err, labels)=>{
            if(err) return res.status(500).send({message:'No se pudo obtener informacion de la Base de Datos'});
            if(!labels) return res.status(404).send({message:'No se encontro Informacion en la Base de Datos'});
            return res.status(200).send({
                data:labels,
                message:'Informacion Enviada con Exito!!!'
            });
        });
    },

    getAllTabledata:(req, res)=>{
        let dataId=req.params.id;
        var labels=  tableLabelsModel.findById(dataId,(err,labels)=>{
            if(err) return res.status(500).send({message:'Aun no hay datos'});
            if(!labels) return res.status(404).send({message:'No se encontraron datos'});
            if(labels){
                var tableData=tableDataModel.find({tableLabelId:dataId},(err,tableData)=>{
                    if(err) return res.status(500).send({message:'Aun no hay series de datos'});
                    if(!tableData) return res.status(404).send({message:'No se encontraron datos para este ID'});
                    if(tableData){
                        return res.status(200).send({
                            labels: labels,
                            data: tableData,
                            message:'Solicitud recibida y datos entregados'
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
                if(err) return res.status(500).send({message:'Error al guardar en base de datos'});
                if(!tableLabelsDB) return res.status(404).send({message:'No se recibieron los datos a guardar'});
                return res.status(200).send({
                    data:tableLabelsDB,
                    message:'Datos guardados en Base de Datos exitosamente!!!'
                });
            });
        }else{
            return res.status(200).send({
                message:'No se pudo guardar debido a que ya existe un objeto'
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
            if(err) return res.status(500).send({message:'Error al guardar en base de datos'});
            if(!tableDataDB) return res.status(404).send({message:'No se recibieron los datos a guardar'});
            return res.status(200).send({
                data:tableDataDB,
                message:'Datos guardados en Base de Datos exitosamente!!!'
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
            if(err) return res.status(500).send({message:'Error  al actualizar'});
            if(!labelsUpdated) return res.status(404).send({message:'No existe  el proyecto para ser actualizado'});
            return res.status(200).send({
                project: labelsUpdated,
                message:'Labels Actualizadas correctamente'
            });
        });   
    },

    deleteTableData:(req,res)=>{
        let tabledataId=req.params.id;
        tableDataModel.findOneAndRemove({'_id':tabledataId},(err,tableDataDeleted)=>{
            if(err) return res.status(500).send({message:'Error al eliminar'});
            if(!tableDataDeleted) return res.status(404).send({message:'No se encontro el elemento en la base de datos'});
            return res.status(200).send({
                tableDataDeleted:tableDataDeleted,
                message:'Series Deleted Successfully'
            });
        });
    }
};

module.exports = controller;