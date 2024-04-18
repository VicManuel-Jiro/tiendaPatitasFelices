'use strict'

var express = require('express');
var PedidoController = require('../controllers/pedido');
var cors = require('cors');

var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', PedidoController.home);
router.post('/test', PedidoController.test);
router.post('/save-pedido', PedidoController.savePedido);
router.get('/pedido/:id?', PedidoController.getPedido);
router.get('/pedidos', PedidoController.getPedidos);
router.put('/pedido/:id', PedidoController.updatePedido);
router.delete('/pedido/:id', PedidoController.deletePedido);


module.exports = router;
