'use strict'

var Product = require('../models/product');

//creamos un objeto controller para disponer de todos los métodos de ruta:
var controller = {

   //Método para guardar un artículo:

   save: (req, res) =>{

       var params = req.body;
       console.log(params);
       //Objeto a guardar
       var product = new Product();

       // Asignar valores
       product.name = params.name;
       product.imageLink = params.imageLink;
       product.description = params.description;
      product.macros.protein = params.macros.protein
       product.macros.carbohidrates = params.macros.carbohidrates
       product.macros.fat = params.macros.fat
       product.price = params.price
       

       // Guardamos el articulo
       product.save((err, productStored) => {

           if(err || !productStored){
               return res.status(404).send({
                   status: 'error',
                   message: 'El artículo no se ha guardado !!!'
               });
           }

           // Devolver una respuesta 
           return res.status(200).send({
               status: 'success',
               productStored
           });

       }); 
           
   },

   //Método para obtener o listar los artículos:

   getProducts: (req, res) =>{

       var query = Product.find({});

       query.exec((err, products) => {

           if(err){
               return res.status(505).send({
                   status: "error",
                   message: "Error al extraer los datos"
               });
           }

           //Si no existen artículos:
           if(!products){
               return res.status(404).send({
                   status: "error",
                   message: "No hay artículos para mostrar"
               });
           }

           return res.status(202).send({
               status: "success",
               products
           });

       });	

   },

   //Eliminar un artículo:

   delete: (req, res) =>{

       //Recogemos el id de la url
       var productId = req.params.id;

       Product.findOneAndDelete({_id: productId}, (err, productRemoved) =>{

           if(err){
               return res.status(505).send({
                   status: "error",
                   message: "Error al eliminar!!"
               });
           }

           if(!productRemoved){
               return res.status(404).send({
                   status: "error",
                   message: "No se ha encontrado el artículo que deseas eliminar!!"
               });
           }

           //Si no hay ningún error obtenemos el artículo eliminado

           return res.status(202).send({
               status: "success",
               product: productRemoved
           });
           
       });

   }

}; 

module.exports = controller;