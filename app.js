'use strict'

var express= require('express');
var app= express();

//load Templates
const chartAppMainPage=  require('./templates/chartsMainPage-template');
const angularProjectsAppMainPage= require('./templates/angularProjectsMainPage');

//Load CHARTS-APP Routes
var mainchartdata_routes=require('./chartsApp/routes/mainChartRoutes');
var piechartdata_routes=require('./chartsApp/routes/pieChartRoutes');
var table_routes=require('./chartsApp/routes/tableRoutes');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Backend Angular Projects Main Page  
app.get('/',(req,res)=>{
    res.status(200).send( angularProjectsAppMainPage );
});

//Backend Charts-App Main Page  
app.get('/chartsApp',(req,res)=>{
    res.status(200).send(chartAppMainPage);
});

//CHARTS-APP Routes
app.use('/chartsApp', mainchartdata_routes);
app.use('/chartsApp', piechartdata_routes);
app.use('/chartsApp', table_routes);

module.exports = app;