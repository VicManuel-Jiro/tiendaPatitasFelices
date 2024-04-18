'use strict'

var express = require('express');
var ProductoPedidoController = require('../controllers/productopedido');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProductoPedidoController.home);
router.post('/test', ProductoPedidoController.test);
router.post('/save-productopedido', ProductoPedidoController.saveProductoPedido);
router.get('/productopedido/:id?', ProductoPedidoController.getProductoPedido);
router.get('/productopedidos', ProductoPedidoController.getProductoPedidos);
router.put('/productopedido/:id', ProductoPedidoController.updateProductoPedido);
router.delete('/productopedido/:id', ProductoPedidoController.deleteProductoPedido);



module.exports = router;