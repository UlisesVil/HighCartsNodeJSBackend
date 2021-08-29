'use strict'

var mainChartData = require('../models/mainChartModel');
var mainChartLabels = require('../models/mainChartLabelsModel');



var controller={

    getdataCards:(req,res)=>{
        mainChartData.find({}).exec((err,data)=>{
            if(err) return res.status(500).send({message:'No se pudo obtener informacion de la Base de Datos'});
            if(!data) return res.status(404).send({message:'No se encontro Informacion en la Base de Datos'});

            return res.status(200).send({
                data:data,
                message:'Informacion Enviada con Exito!!!'
            });
        });
    },



    getMainChartLabels:(req,res)=>{
        //console.log(req.params);
        

        //res.status(200).send({message:'get de labels en el backend'});
       // var mylabels;
    
        mainChartLabels.find({}).exec((err, labels)=>{
            if(err) return res.status(500).send({message:'No se pudo obtener informacion de la Base de Datos'});
            if(!labels) return res.status(404).send({message:'No se encontro Informacion en la Base de Datos'});

            return res.status(200).send({
                data:labels,
                message:'Informacion Enviada con Exito!!!'
            });

           
            
        });
        
    

/*
    //Como extraer los datos de una promesa
        var miConsulta=  mainChartLabels.findOne({}).exec();
            //Promise{<pending>}
        miConsulta.then(result=>{
            console.log(result);//contenido de la consulta
        });
*/
        



    },




    saveMainChartData: (req, res)=>{
        //console.log(req.body);
        
       let datastr=req.body.data.split(' ');
       var arrData=[];
       for(let i=0; i<datastr.length; i++){
           //console.log(datastr[i]);
           if(datastr[i]!=''){
            arrData.push(parseInt(datastr[i]));
           }
       }
       let newArr= JSON.stringify(arrData);

       //console.log(newArr);

        var chartData = new mainChartData;
        var data = req.body;
        chartData.chartlabelId=data.chartlabelId
        chartData.name= data.seriesName;
        chartData.data=newArr;
        chartData.target=data.target
        

        //console.log(arrData);

        chartData.save((err, mainChartDataDB)=>{
            if(err) return res.status(500).send({message:'Error al guardar en base de datos'});
            if(!mainChartDataDB) return res.status(404).send({message:'No se recibieron los datos a guardar'});
            return res.status(200).send({
                data:mainChartDataDB,
                message:'Datos guardados en Base de Datos exitosamente!!!'
            });
        });

    },



    getAlldata:(req, res)=>{
        let dataId=req.params.id;

        var labels=  mainChartLabels.findById(dataId,(err,labels)=>{
            if(err) return res.status(500).send({message:'Aun no hay datos'});
            if(!labels) return res.status(404).send({message:'No se encontraron datos'});

            if(labels){
                var chartData=mainChartData.find({chartlabelId:dataId},(err,chartData)=>{
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



    saveMainChartLabels: (req, res)=>{
        //console.log(req.body);

        var chartLabels = new mainChartLabels;
            var labels = req.body;
            chartLabels.title= labels.title;
            chartLabels.subTitle= labels.subTitle;
            chartLabels.labelXAxis= labels.labelXAxis;
            chartLabels.labelYAxis= labels.labelYAxis;
            chartLabels.toolTip= labels.toolTip;
        
        if(req.body.idLabel===undefined){
            //console.log('idLabel vacia');
             //console.log(chartLabels);
            chartLabels.save((err, mainchartLabelsDB)=>{
                if(err) return res.status(500).send({message:'Error al guardar en base de datos'});
                if(!mainchartLabelsDB) return res.status(404).send({message:'No se recibieron los datos a guardar'});
                return res.status(200).send({
                    data:mainchartLabelsDB,
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



    updateMainChartLabels:(req,res)=>{
        //console.log(req.body);
        let updateLabels=req.body;
        let idLabel= updateLabels._id
        let chartLabels={
            title:updateLabels.title,
            subTitle:updateLabels.subTitle, 
            labelXAxis:updateLabels.labelXAxis, 
            labelYAxis:updateLabels.labelYAxis, 
            toolTip:updateLabels.toolTip,   
        }
        //console.log(idLabel);
        
    
        mainChartLabels.findByIdAndUpdate(idLabel, chartLabels,{new:true},(err,labelsUpdated)=>{
            if(err) return res.status(505).send({message:'Error  al actualizar'});

            if(!labelsUpdated) return res.status(404).send({message:'No existe  el proyecto para ser actualizado'});

            return res.status(200).send({
                project: labelsUpdated,
                message:'Labels Actualizadas correctamente'
            });
        });

    },

    deleteSeries:(req,res)=>{
        console.log(req.params);
        let seriesId=req.params.id;
        console.log(seriesId);
        mainChartData.findOneAndRemove({'_id':seriesId},(err,seriesDeleted)=>{
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