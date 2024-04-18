'use strict'

var Usuario = require('../models/usuario');
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
			message: "Método Test Controlador Usuario"
		});
	},

	saveUsuario: function(req, res){
		var usuario = new Usuario();

		var params = req.body;
		usuario.usuario=params.usuario;
		usuario.pass=params.pass;
		usuario.nombre=params.nombre;
		usuario.apellidos=params.apellidos;
		usuario.correo=params.correo;
		usuario.pais=params.pais;
		usuario.estado=params.estado;
		usuario.ciudad=params.ciudad;
		usuario.cp=params.cp;
		usuario.telefono=params.telefono;
		usuario.tipoUsuario=params.tipoUsuario;
		usuario.direccion=params.direccion;
		usuario.rfc=params.rfc;
		usuario.imagen = null;

		usuario.save((err, usuarioStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!usuarioStored) return res.status(404).send({message: 'No se ha podido guardar el usuario.'});

			return res.status(200).send({usuario: usuarioStored});
		});
	},
	updateUsuario: function(req, res){
		var usuarioId = req.params.id;
		var update = req.body;

		Usuario.findByIdAndUpdate(usuarioId, update, {new:true}, (err, usuarioUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!usuarioUpdated) return res.status(404).send({message: 'No existe el usuario para actualizar'});

			return res.status(200).send({
				usuario: usuarioUpdated
			});
		});

	},
	getUsuario: function(req, res){
		var usuarioId = req.params.id;

		if(usuarioId == null) return res.status(404).send({message: 'El usuario no existe.'});

		Usuario.findById(usuarioId, (err, usuario) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!usuario) return res.status(404).send({message: 'El usuario no existe.'});

			return res.status(200).send({usuario});
		});
	},
	login: function(req,res){
		var user= req.body.usuario;
		var passw = req.body.pass;
		//console.log("usuario "+user);
		//console.log("pass "+passw);
		if(user == null) return res.status(404).send({message: 'El usuario no existe o hubo un error al enviar la peticion.'});
		Usuario.find({usuario: user, pass: passw}).exec((err, usuario) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!usuario) return res.status(404).send({message: 'El usuario no existe.'});

			return res.status(200).send({usuario});
		});
	},
	getUsuarios: function(req, res){

		Usuario.find({}).sort('-year').exec((err, usuarios) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!usuarios) return res.status(404).send({message: 'No hay usuarioos que mostrar.'});

			return res.status(200).send({usuarios});
		});

	},

	



uploadImage: function(req, res){
var usuarioId = req.params.id;
var fileName = 'Imagen no subida...';



if(req.files){
var filePath = req.files.imagen.path;
var fileSplit = filePath.split('\\');
var fileName = fileSplit[1];
var extSplit = fileName.split('\.');
var fileExt = extSplit[1];



if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){



Usuario.findByIdAndUpdate(usuarioId, {imagen: fileName}, {new: true}, (err, usuarioUpdated) => {
if(err) return res.status(500).send({message: 'La imagen no se ha subido'});



if(!usuarioUpdated) return res.status(404).send({message: 'El usuario no existe y no se ha asignado la imagen'});



return res.status(200).send({
usuario: usuarioUpdated
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

	deleteUsuario: function(req, res){
		var usuarioId = req.params.id;

		Usuario.findByIdAndRemove(usuarioId, (err, usuarioRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el usuario'});

			if(!usuarioRemoved) return res.status(404).send({message: "No se puede eliminar ese usuario."});

			return res.status(200).send({
				usuario: usuarioRemoved
			});
		});
	}


}; 

module.exports = controller; 