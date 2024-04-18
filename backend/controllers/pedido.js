'use strict'

var Pedido = require('../models/pedido');
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
			message: "Método Test Controlador Pedido"
		});
	},

	savePedido: function(req, res){
		var pedido = new Pedido();
		var params = req.body;
		pedido.usuarioId=params.usuarioId;
		pedido.fechaCreacion=params.fechaCreacion;
		pedido.monto=params.monto;
		pedido.ship=params.ship;
		pedido.tipoPago=params.tipoPago;
		pedido.tarjeta=params.tarjeta;
		pedido.cvc=params.cvc;
		pedido.mes=params.mes;
		pedido.year=params.year;
		pedido.nombreTarjeta=params.nombreTarjeta;
		pedido.correo=params.correo;
		pedido.direccion=params.direccion;
		pedido.pais=params.pais;
		pedido.estado=params.estado;
		pedido.ciudad=params.ciudad;
		pedido.cp=params.cp;
		pedido.telefono=params.telefono;

		pedido.save((err, pedidoStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!pedidoStored) return res.status(404).send({message: 'No se ha podido guardar el pedido.'});

			return res.status(200).send({pedido: pedidoStored});
		});
	},
	updatePedido: function(req, res){
		var pedidoId = req.params.id;
		var update = req.body;

		Pedido.findByIdAndUpdate(pedidoId, update, {new:true}, (err, pedidoUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!pedidoUpdated) return res.status(404).send({message: 'No existe el pedido para actualizar'});

			return res.status(200).send({
				pedido: pedidoUpdated
			});
		});

	},
	getPedido: function(req, res){
		var pedidoId = req.params.id;

		if(pedidoId == null) return res.status(404).send({message: 'El pedido no existe.'});

		Pedido.findById(pedidoId, (err, pedido) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!pedido) return res.status(404).send({message: 'El pedido no existe.'});

			return res.status(200).send({pedido});
		});
	},
	getPedidos: function(req, res){

		Pedido.find({}).sort('-year').exec((err, pedidos) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!pedidos) return res.status(404).send({message: 'No hay pedidoos que mostrar.'});

			return res.status(200).send({pedidos});
		});

	},

	deletePedido: function(req, res){
		var pedidoId = req.params.id;

		Pedido.findByIdAndRemove(pedidoId, (err, pedidoRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el pedido'});

			if(!pedidoRemoved) return res.status(404).send({message: "No se puede eliminar ese pedido."});

			return res.status(200).send({
				pedido: pedidoRemoved
			});
		});
	}


}; 

module.exports = controller; 