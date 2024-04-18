'use strict'

var Producto = require('../models/producto');
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
			message: "Método Test Controlador Producto"
		});
	},

	saveProducto: function(req, res){
		var producto = new Producto();

		var params = req.body;
		//console.log(params);
		producto.codigoBarras = params.codigoBarras;
		producto.nombre = params.nombre;
		producto.precio = params.precio;
		producto.descripcion = params.descripcion;
		producto.existencia = params.existencia;
		producto.imagen = null;
		producto.fechaCreacion = params.fechaCreacion;

		producto.save((err, productoStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!productoStored) return res.status(404).send({message: 'No se ha podido guardar el producto.'});

			return res.status(200).send({producto: productoStored});
		});
	},
	updateProducto: function(req, res){
		var productoId = req.params.id;
		var update = req.body;

		Producto.findByIdAndUpdate(productoId, update, {new:true}, (err, productoUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!productoUpdated) return res.status(404).send({message: 'No existe el producto para actualizar'});

			return res.status(200).send({
				producto: productoUpdated
			});
		});

	},
	getProducto: function(req, res){
		var productoId = req.params.id;

		if(productoId == null) return res.status(404).send({message: 'El producto no existe.'});

		Producto.findById(productoId, (err, producto) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!producto) return res.status(404).send({message: 'El producto no existe.'});

			return res.status(200).send({producto});
		});
	},

	getProductos: function(req, res){

		Producto.find({}).sort('-year').exec((err, productos) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!productos) return res.status(404).send({message: 'No hay productoos que mostrar.'});

			return res.status(200).send({productos});
		});

	},

	



uploadImage: function(req, res){
var productoId = req.params.id;
var fileName = 'Imagen no subida...';



if(req.files){
var filePath = req.files.imagen.path;
var fileSplit = filePath.split('\\');
var fileName = fileSplit[1];
var extSplit = fileName.split('\.');
var fileExt = extSplit[1];



if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){



Producto.findByIdAndUpdate(productoId, {imagen: fileName}, {new: true}, (err, productoUpdated) => {
if(err) return res.status(500).send({message: 'La imagen no se ha subido'});



if(!productoUpdated) return res.status(404).send({message: 'El producto no existe y no se ha asignado la imagen'});



return res.status(200).send({
producto: productoUpdated
});
});



}else{
fs.unlink(filePath, (err) => {
return res.status(200).send({message: 'La extensión no es válida'});
});
}



}else{
return res.status(200).send({
message: fileName
});
}



},

 getImageFile: function(req, res){
var file = req.params.image;
var path_file = './uploads/'+file;

 fs.exists(path_file, (exists) => {
if(exists){
return res.sendFile(path.resolve(path_file));
}else{
return res.status(200).send({
message: "No existe la imagen..."
});
}
});
},

	deleteProducto: function(req, res){
		var productoId = req.params.id;

		Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el producto'});

			if(!productoRemoved) return res.status(404).send({message: "No se puede eliminar ese producto."});

			return res.status(200).send({
				producto: productoRemoved
			});
		});
	}


}; 

module.exports = controller; 