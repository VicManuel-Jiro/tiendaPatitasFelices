'use strict'

var Mascota = require('../models/mascota');
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
			message: "Método Test Controlador Mascota"
		});
	},

	saveMascota: function(req, res){
		var mascota = new Mascota();

		var params = req.body;
		//console.log(params);
		mascota.nombre = params.nombre;
		mascota.edad = params.edad;
		mascota.materia = params.materia;
		mascota.raza = params.raza;
		mascota.estado = params.estado;
		mascota.imagen = null;
		mascota.fechaCreacion = params.fechaCreacion;

		mascota.save((err, mascotaStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

			if(!mascotaStored) return res.status(404).send({message: 'No se ha podido guardar el mascota.'});

			return res.status(200).send({mascota: mascotaStored});
		});
	},
	updateMascota: function(req, res){
		var mascotaId = req.params.id;
		var update = req.body;

		Mascota.findByIdAndUpdate(mascotaId, update, {new:true}, (err, mascotaUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!mascotaUpdated) return res.status(404).send({message: 'No existe el mascota para actualizar'});

			return res.status(200).send({
				mascota: mascotaUpdated
			});
		});

	},
	getMascota: function(req, res){
		var mascotaId = req.params.id;

		if(mascotaId == null) return res.status(404).send({message: 'El mascota no existe.'});

		Mascota.findById(mascotaId, (err, mascota) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!mascota) return res.status(404).send({message: 'El mascota no existe.'});

			return res.status(200).send({mascota});
		});
	},

	getMascotas: function(req, res){

		Mascota.find({}).sort('-year').exec((err, mascotas) => {

			if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

			if(!mascotas) return res.status(404).send({message: 'No hay mascotaos que mostrar.'});

			return res.status(200).send({mascotas});
		});

	},

	



uploadImage: function(req, res){
var mascotaId = req.params.id;
var fileName = 'Imagen no subida...';



if(req.files){
var filePath = req.files.imagen.path;
var fileSplit = filePath.split('\\');
var fileName = fileSplit[1];
var extSplit = fileName.split('\.');
var fileExt = extSplit[1];



if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){



Mascota.findByIdAndUpdate(mascotaId, {imagen: fileName}, {new: true}, (err, mascotaUpdated) => {
if(err) return res.status(500).send({message: 'La imagen no se ha subido'});



if(!mascotaUpdated) return res.status(404).send({message: 'El mascota no existe y no se ha asignado la imagen'});



return res.status(200).send({
mascota: mascotaUpdated
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

	deleteMascota: function(req, res){
		var mascotaId = req.params.id;

		Mascota.findByIdAndRemove(mascotaId, (err, mascotaRemoved) => {
			if(err) return res.status(500).send({message: 'No se ha podido borrar el mascota'});

			if(!mascotaRemoved) return res.status(404).send({message: "No se puede eliminar ese mascota."});

			return res.status(200).send({
				mascota: mascotaRemoved
			});
		});
	}


}; 

module.exports = controller; 