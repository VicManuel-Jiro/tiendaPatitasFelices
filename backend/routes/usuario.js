'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', UsuarioController.home);
router.post('/test', UsuarioController.test);
router.post('/save-usuario', UsuarioController.saveUsuario);
router.get('/usuario/:id?', UsuarioController.getUsuario);
router.get('/usuarios', UsuarioController.getUsuarios);
router.put('/usuario/:id', UsuarioController.updateUsuario);
router.delete('/usuario/:id', UsuarioController.deleteUsuario);
router.post('/upload-image/usuario/:id', multipartMiddleware, UsuarioController.uploadImage);
router.get('/get-image/:image', UsuarioController.getImageFile);
router.post('/usuario/login',UsuarioController.login);

module.exports = router;
