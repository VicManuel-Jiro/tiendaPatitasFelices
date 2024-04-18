'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactoSchema = Schema({
 nombre: String,
 apellidos: String,
 email: String,
 fechaCreacion: String,
 mensaje: String
});

module.exports = mongoose.model('Contacto', ContactoSchema);