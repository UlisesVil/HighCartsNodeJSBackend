'use strict'

var tableDataModel = require('../models/tableDataModel');
var tableLabelsModel = require('../models/tableLabelsModel');



var controller={


    saveTableLabels:(req,res)=>{
        console.log(req.body);
        //return res.status(200).send({message:'recibido en SaveTAbleLabels'})
        
        var tableLabels = new tableLabelsModel;
            var labels = req.body;
            tableLabels.header1= labels.header1;
            tableLabels.header2= labels.header2;
            tableLabels.header3= labels.header3;
        
        if(req.body.idLabel===undefined){
            console.log('idLabel vacia');
             //console.log(tableLabels);
            tableLabels.save((err, tableLabelsDB)=>{
                if(err) return res.status(500).send({message:'Error al guardar en base de datos'});
                if(!tableLabelsDB) return res.status(404).send({message:'No se recibieron los datos a guardar'});
                return res.status(200).send({
                    data:tableLabelsDB,
                    message:'Datos guardados en Base de Datos exitosamente!!!'
                });
            });
        }else{
            //console.log('este es el idLavel '+req.body.idLabel);
            return res.status(200).send({
                message:'No se pudo guardar debido a que ya existe un objeto'
            });
        }
    },
    

    saveTableData:(req,res)=>{
        console.log(req.body);


        var tableData = new tableDataModel;
        var data = req.body;
        tableData.tableLabelId=data.tableLabelId
        tableData.dataH1= data.dataH1;
        tableData.dataH2= data.dataH2;
        tableData.dataH3= data.dataH3;
        

        //console.log(arrData);

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
        console.log(req.body);
        console.log('entro al update');

        //console.log(req.body);
        let updateLabels=req.body;
        let idLabel= updateLabels.idLabel
        let tableLabels={
            header1:updateLabels.header1,
            header2:updateLabels.header2, 
            header3:updateLabels.header3 
        }
        console.log(idLabel);
        
    
        tableLabelsModel.findByIdAndUpdate(idLabel, tableLabels,{new:true},(err,labelsUpdated)=>{
            if(err) return res.status(500).send({message:'Error  al actualizar'});

            if(!labelsUpdated) return res.status(404).send({message:'No existe  el proyecto para ser actualizado'});

            return res.status(200).send({
                project: labelsUpdated,
                message:'Labels Actualizadas correctamente'
            });
        });   
    },



    getTableLabels:(req,res)=>{
        console.log(req.params);
        

        //res.status(200).send({message:'get de labels en el backend'});
       // var mylabels;
    
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
        console.log(req.params);

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


    deleteTableData:(req,res)=>{
        console.log(req.params);
       
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