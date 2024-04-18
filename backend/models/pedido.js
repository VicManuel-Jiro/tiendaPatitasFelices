'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PedidoSchema = Schema({
	usuarioId: String,
	fechaCreacion: Date,
	monto: Number,
	ship: String,
	tipoPago: String,
	tarjeta: String,
	cvc: String,
	mes: String,
	year: String,
	nombreTarjeta: String,
	correo: String,
	direccion: String,
	pais: String,
	estado: String,
	ciudad: String,
	cp: String,
	telefono: String
});

module.exports = mongoose.model('Pedido', PedidoSchema);