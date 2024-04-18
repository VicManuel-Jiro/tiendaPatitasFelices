'use strict'

var express = require('express');
var MascotaController = require('../controllers/mascota');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', MascotaController.home);
router.post('/test', MascotaController.test);
router.post('/save-mascota', MascotaController.saveMascota);
router.get('/mascota/:id?', MascotaController.getMascota);
router.get('/mascotas', MascotaController.getMascotas);
router.put('/mascota/:id', MascotaController.updateMascota);
router.delete('/mascota/:id', MascotaController.deleteMascota);
router.post('/upload-image/mascota/:id', multipartMiddleware, MascotaController.uploadImage);
router.get('/get-image/:image', MascotaController.getImageFile);

module.exports = router;
