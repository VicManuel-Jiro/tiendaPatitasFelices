'use strict'

var Contacto = require('../models/contacto');
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
			message: "Método Test Controlador Contacto"
		});
	},

	saveContacto: function(req, res){
		var contacto = new Contacto();

		var params = req.body;
		//console.log(params);
		contacto.nombre = params.nombre;
		contacto.apellidos = params.apellidos;
		contacto.email = params.email;
		contacto.mensaje = params.mensaje;
		contacto.fechaCreacion = params.fechaCreacion;
		contacto.save((err, contactoStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!contactoStored) return res.status(404).send({message: 'No se ha podido guardar el contacto.'});

			return res.status(200).send({contacto: contactoStored});
		});
	},
	updateContacto: function(req, res){
		var contactoId = req.params.id;
		var update = req.body;

		Contacto.findByIdAndUpdate(contactoId, update, {new:true}, (err, contactoUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!contactoUpdated) return res.status(404).send({message: 'No existe el contacto para actualizar'});

			return res.status(200).send({
				contacto: contactoUpdated
			});
		});

	},
	getContacto: function(req, res){
		var contactoId = req.params.id;

		if(contactoId == null) return res.status(404).send({message: 'El contacto no existe.'});

		Contacto.findById(contactoId, (err, contacto) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!contacto) return res.status(404).send({message: 'El contacto no existe.'});

			return res.status(200).send({contacto});
		});
	},

	getContactos: function(req, res){

		Contacto.find({}).sort('-year').exec((err, contactos) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!contactos) return res.status(404).send({message: 'No hay contactoos que mostrar.'});

			return res.status(200).send({contactos});
		});

	},

	



uploadImage: function(req, res){
var contactoId = req.params.id;
var fileName = 'Imagen no subida...';



if(req.files){
var filePath = req.files.imagen.path;
var fileSplit = filePath.split('\\');
var fileName = fileSplit[1];
var extSplit = fileName.split('\.');
var fileExt = extSplit[1];



if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){



Contacto.findByIdAndUpdate(contactoId, {imagen: fileName}, {new: true}, (err, contactoUpdated) => {
if(err) return res.status(500).send({message: 'La imagen no se ha subido'});



if(!contactoUpdated) return res.status(404).send({message: 'El contacto no existe y no se ha asignado la imagen'});



return res.status(200).send({
contacto: contactoUpdated
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

	deleteContacto: function(req, res){
		var contactoId = req.params.id;

		Contacto.findByIdAndRemove(contactoId, (err, contactoRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el contacto'});

			if(!contactoRemoved) return res.status(404).send({message: "No se puede eliminar ese contacto."});

			return res.status(200).send({
				contacto: contactoRemoved
			});
		});
	}


}; 

module.exports = controller; 