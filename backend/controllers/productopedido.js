'use strict'

var ProductoPedido = require('../models/productopedido');
var fs = require('fs');
var path = require('path');

var controller = {
	
	home: function(req, res){
		return res.status(200).send({
			message: 'Página home'
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: "Método Test Controlador ProductoPedido"
		});
	},

	saveProductoPedido: function(req, res){
		var productoPedido = new ProductoPedido();

		var params = req.body;
		productoPedido.pedidoId=params.pedidoId;
		productoPedido.articuloId=params.articuloId;
		productoPedido.cantidad=params.cantidad;
		
		productoPedido.save((err, productoPedidoStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!productoPedidoStored) return res.status(404).send({message: 'No se ha podido guardar el productoPedido.'});

			return res.status(200).send({productoPedido: productoPedidoStored});
		});
	},
	updateProductoPedido: function(req, res){
		var productoPedidoId = req.params.id;
		var update = req.body;

		ProductoPedido.findByIdAndUpdate(productoPedidoId, update, {new:true}, (err, productoPedidoUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!productoPedidoUpdated) return res.status(404).send({message: 'No existe el productoPedido para actualizar'});

			return res.status(200).send({
				productoPedido: productoPedidoUpdated
			});
		});

	},
	getProductoPedido: function(req, res){
		var productoPedidoId = req.params.id;

		if(productoPedidoId == null) return res.status(404).send({message: 'El productoPedido no existe.'});

		ProductoPedido.findById(productoPedidoId, (err, productoPedido) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!productoPedido) return res.status(404).send({message: 'El productoPedido no existe.'});

			return res.status(200).send({productoPedido});
		});
	},
	getProductoPedidos: function(req, res){

		ProductoPedido.find({}).sort('-year').exec((err, productoPedidos) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!productoPedidos) return res.status(404).send({message: 'No hay productoPedidoos que mostrar.'});

			return res.status(200).send({productoPedidos});
		});

	},

	deleteProductoPedido: function(req, res){
		var productoPedidoId = req.params.id;

		ProductoPedido.findByIdAndRemove(productoPedidoId, (err, productoPedidoRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el productoPedido'});

			if(!productoPedidoRemoved) return res.status(404).send({message: "No se puede eliminar ese productoPedido."});

			return res.status(200).send({
				productoPedido: productoPedidoRemoved
			});
		});
	}


}; 

module.exports = controller; 