const nodemon = require('nodemon');
const app=require('./app');
const mongoose= require('mongoose');
const PORT = 3700;

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/ChartsTest")
    .then(()=>{
        console.log('---Data Base Connection Success!!!---');

        app.listen(PORT,()=>{
            console.log('---Server Runing on Port:'+ PORT +'---');
        })
    })
    .catch(err=>console.log(err));