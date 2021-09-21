'use strict'

var mongoose= require('mongoose');
var app=require('./app');
var PORT= process.env.PORT || 3700;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_CONNECT,{
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(()=>{
        console.log('----Data Base Connection Successfull established----');

        app.listen(PORT,()=>{
            console.log("----Server Running on port: "+PORT+"----");
        });
    }).catch(
        err=>console.log(err)
    )
;
