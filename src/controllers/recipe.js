'use strict'

var Recipe = require('../models/recipe');

//creamos un objeto controller para disponer de todos los métodos de ruta:
var controller = {

   //Método para guardar un artículo:

   save: (req, res) =>{

       var params = req.body;
       console.log(params);
       //Objeto a guardar
       var recipe = new Recipe();

       // Asignar valores
       recipe.name = params.name;
       recipe.imageLink = params.imageLink;
       recipe.tutorialLink = params.tutorialLink;
       recipe.description = params.description;
       recipe.macros.protein = params.macros.protein
       recipe.macros.carbohidrates = params.macros.carbohidrates
       recipe.macros.fat = params.macros.fat
       recipe.recipe = params.recipe

       // Guardamos el articulo
       recipe.save((err, recipeStored) => {

           if(err || !recipeStored){
               return res.status(404).send({
                   status: 'error',
                   message: 'El artículo no se ha guardado !!!'
               });
           }

           // Devolver una respuesta 
           return res.status(200).send({
               status: 'success',
               recipeStored
           });

       }); 
           
   },

   //Método para obtener o listar los artículos:

   getrecipes: (req, res) =>{

       var query = Recipe.find({});

       query.exec((err, recipes) => {

           if(err){
               return res.status(505).send({
                   status: "error",
                   message: "Error al extraer los datos"
               });
           }

           //Si no existen artículos:
           if(!recipes){
               return res.status(404).send({
                   status: "error",
                   message: "No hay artículos para mostrar"
               });
           }

           return res.status(202).send({
               status: "success",
               recipes
           });

       });	

   },

   //Eliminar un artículo:

   delete: (req, res) =>{

       //Recogemos el id de la url
       var recipeId = req.params.id;

       Recipe.findOneAndDelete({_id: recipeId}, (err, recipeRemoved) =>{

           if(err){
               return res.status(505).send({
                   status: "error",
                   message: "Error al eliminar!!"
               });
           }

           if(!recipeRemoved){
               return res.status(404).send({
                   status: "error",
                   message: "No se ha encontrado el artículo que deseas aliminar!!"
               });
           }

           //Si no hay ningún error obtenemos el artículo eliminado

           return res.status(202).send({
               status: "success",
               recipe: recipeRemoved
           });
           
       });

   }

}; 

module.exports = controller;