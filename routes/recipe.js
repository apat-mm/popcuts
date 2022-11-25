
'use strict'

var express = require('express');

var Recipe = require('../controllers/recipe');

//Llamamos al objeto router de express:
var router = express.Router();

//Rutas para artículos***********************************************************************************

//Guardar un nuevo artículo.
router.post('/save', Recipe.save);

//Obtener todos los artículos sin archivar.
router.get('/recipes', Recipe.getrecipes);

//Eliminar un artículo. Le pasamos el parámetro :id como obligatorio.
router.delete('/delete/:id', Recipe.delete);

module.exports = router;