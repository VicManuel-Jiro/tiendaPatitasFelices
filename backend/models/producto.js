'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
	codigoBarras: String,
	nombre: String,
	precio: Number,
	descripcion: String, 
	existencia:  Number, 
	imagen:  String,
	fechaCreacion: Date
});

module.exports = mongoose.model('Producto', ProductoSchema);