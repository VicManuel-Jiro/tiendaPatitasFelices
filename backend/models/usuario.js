'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	usuario: String,
	pass: String,
	nombre: String,
	apellidos: String,
	correo: String,
	pais: String,
	estado: String,
	ciudad: String,
	cp: String,
	telefono: String,
	tipoUsuario: String,
	imagen:  String,
	direccion: String,
	rfc: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);