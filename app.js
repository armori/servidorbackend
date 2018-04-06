var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var proveedor = require('./routes/proveedor');

var app = express();

//Hay que arrancar antes la bdd
//Ir a la carpeta de mi usuario y mongod --dbpath data/db

//Creará una base de datos erp si no existe

//Añadirá una "s" de plural al crear una colección, creando un plural


mongoose.connect('mongodb://localhost:27017/erp',{promiseLibrary:require('bluebird')})
    .then(()=>{
        console.log('Conectado a la bdd');
    })
    .catch((err)=>{
        console.error(err)
    })

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':false}))

app.use('/proveedor', proveedor);

app.listen(3000,function(){
    console.log('Servidor Ok en puerto 3000');
})