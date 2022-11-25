
'use strict'

var express = require('express');

var Product = require('../controllers/product');

//Llamamos al objeto router de express:
var router = express.Router();

//Rutas para artículos***********************************************************************************

//Guardar un nuevo artículo.
router.post('/save', Product.save);

//Obtener todos los artículos sin archivar.
router.get('/products', Product.getProducts);

//Eliminar un artículo. Le pasamos el parámetro :id como obligatorio.
router.delete('/delete/:id', Product.delete);

module.exports = router;