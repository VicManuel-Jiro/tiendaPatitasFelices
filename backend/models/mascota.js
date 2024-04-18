'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MascotaSchema = Schema({
	nombre: String,
	edad: Number,
	raza: String, 
	estado:  String, 
	imagen:  String,
	fechaCreacion: Date
});

module.exports = mongoose.model('Mascota', MascotaSchema);