'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProductoController.home);
router.post('/test', ProductoController.test);
router.post('/save-producto', ProductoController.saveProducto);
router.get('/producto/:id?', ProductoController.getProducto);
router.get('/productos', ProductoController.getProductos);
router.put('/producto/:id', ProductoController.updateProducto);
router.delete('/producto/:id', ProductoController.deleteProducto);
router.post('/upload-image/producto/:id', multipartMiddleware, ProductoController.uploadImage);
router.get('/get-image/:image', ProductoController.getImageFile);

module.exports = router;
