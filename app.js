var express= require('express');
var app= express();
var nodemon= require('nodemon');




//LOAD Routes
var mainchartdata_routes=require('./routes/mainChartRoutes');
var piechartdata_routes=require('./routes/pieChartRoutes');
var table_routes=require('./routes/tableRoutes'); 



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


//routes
app.use('/', mainchartdata_routes);
app.use('/', piechartdata_routes);
app.use('/', table_routes);






//Main Page from Backend

app.get('/', (req,res)=>{
    res.status(200).send(
        `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Racing Games Site</title>
            <link rel="icon" type="image/x-icon" href="">
            <style>
                body{
                    background:#181818;
                    color: white;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
                .content{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    width:90%;
                    margin: auto;
                    text-align: center;
                }
                img{
                    width:40%;
                    min-width:200px;
                    margin-top:30px;
                }
                a{
                    text-decoration:none;
                    color: yellowgreen;
                }
            </style>
        </head>
        <body>
            <div class="content">
                <h1 style='color: white;'>Welcome!! This is the API Rest from The Charts Angular APP</h1>
                <h2>You can visit the site here: <a href="https://ulisesvil.github.io" target="_blank">Charts Angular APP</a></h2>
                <img src="https://images-cdn.newscred.com/Zz04NjA3ZjljMjQ0ODkxMWViOWRjYzU1OGJkNjI1ZjVkZA==">
                </div>
        </body>
        `
    )
});



module.exports=app;