'use strict'

var express = require('express');
var ContactoController = require('../controllers/contacto');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ContactoController.home);
router.post('/test', ContactoController.test);
router.post('/save-contacto', ContactoController.saveContacto);
router.get('/contacto/:id?', ContactoController.getContacto);
router.get('/contactos', ContactoController.getContactos);
router.put('/contacto/:id', ContactoController.updateContacto);
router.delete('/contacto/:id', ContactoController.deleteContacto);
router.post('/upload-image/contacto/:id', multipartMiddleware, ContactoController.uploadImage);
router.get('/get-image/:image', ContactoController.getImageFile);

module.exports = router;