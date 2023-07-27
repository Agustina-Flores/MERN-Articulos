'use strict'

const express = require('express');
const bodyParser = require('body-parser');
 

const app = express(); //inicializo express

const port = 3900;

const mongoose = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/api_rest_reactnotas';

mongoose.Promise = global.Promise;

var article_routes = require('./routes/article');

//cargamos bodyparser, es un middleware para analizar cuerpos a traves de la URL
app.use(bodyParser.urlencoded ({extended: false}));

//cualquier peticion la convertimos a formato JSON
app.use(bodyParser.json());

//activamos el CORS para permitir las peticiones AJAX y HTTP desde el frontend
app.use((req,res,next) =>{
res.header('Access-Control-Allow-Origin' , '*');
res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Request-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
next();
});

app.use('/api', article_routes);

//cambio

mongoose.set('strictQuery', true);

//conexion base de datos
mongoose.connect(url,{useNewUrlParser: true}).then(()=>{
console.log("Conexion realizada con exito");

app.listen(port, () =>{
    console.log('Lanzando la aplicacion en puerto ' + port);
    
    });
});
 