'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

// cargar archivos rutas
var producto_routes= require('./routes/producto');
var mascota_routes= require('./routes/mascota');
var usuario_routes= require('./routes/usuario');
var contacto_routes= require('./routes/contacto');
var pedido_routes=require('./routes/pedido');
var producto_pedido_routes=require('./routes/productopedido');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors
app.use(cors());

// Configurar cabeceras y cors
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
next();
});

// rutas
app.use('/api', producto_routes);
app.use('/api', mascota_routes);
app.use('/api', usuario_routes);
app.use('/api', contacto_routes);
app.use('/api', pedido_routes);
app.use('/api', producto_pedido_routes);

// exportar
module.exports = app;