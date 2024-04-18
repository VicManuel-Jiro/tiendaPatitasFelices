'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoPedidoSchema = Schema({
	pedidoId: String,
	articuloId: String,
	cantidad: Number
});

module.exports = mongoose.model('ProductoPedido', ProductoPedidoSchema);