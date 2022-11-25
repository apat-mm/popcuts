
'use strict'

var express = require('express');

var Cart = require('../controllers/cart');
var Carto = require('../models/cart')

//Llamamos al objeto router de express:
var router = express.Router();

//Rutas para artículos***********************************************************************************

//Guardar un nuevo artículo.
router.post('/save', Cart.save);

//Obtener todos los artículos sin archivar.
router.get('/carts', Cart.getCarts);

//Eliminar un artículo. Le pasamos el parámetro :id como obligatorio.
router.delete('/delete/:id', Cart.delete);



module.exports = router;