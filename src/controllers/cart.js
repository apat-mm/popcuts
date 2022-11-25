'use strict'

var Cart = require('../models/cart');

//creamos un objeto controller para disponer de todos los métodos de ruta:
var controller = {

   //Método para guardar un artículo:

   save: (req, res) =>{

       var params = req.body;
       console.log(params);
       //Objeto a guardar
       var cart = new cart();

       // Asignar valores
       cart.name = params.name;
       cart.items = params.items;
       
       

       // Guardamos el articulo
       cart.save((err, cartStored) => {

           if(err || !cartStored){
               return res.status(404).send({
                   status: 'error',
                   message: 'El artículo no se ha guardado !!!'
               });
           }

           // Devolver una respuesta 
           return res.status(200).send({
               status: 'success',
               cartStored
           });

       }); 
           
   },

   //Método para obtener o listar los artículos:

   getCarts: (req, res) =>{

       var query = Cart.find({});

       query.exec((err, carts) => {

           if(err){
               return res.status(505).send({
                   status: "error",
                   message: "Error al extraer los datos"
               });
           }

           //Si no existen artículos:
           if(!carts){
               return res.status(404).send({
                   status: "error",
                   message: "No hay artículos para mostrar"
               });
           }

           return res.status(202).send({
               status: "success",
               carts
           });

       });	

   },

   //Eliminar un artículo:

   delete: (req, res) =>{

       //Recogemos el id de la url
       var cartId = req.params.id;

       Cart.findOneAndDelete(({_id: cartId}, (err, cartRemoved) =>{

           if(err){
               return res.status(505).send({
                   status: "error",
                   message: "Error al eliminar!!"
               });
           }

           if(!cartRemoved){
               return res.status(404).send({
                   status: "error",
                   message: "No se ha encontrado el artículo que deseas eliminar!!"
               });
           }

           //Si no hay ningún error obtenemos el artículo eliminado

           return res.status(202).send({
               status: "success",
               cart: cartRemoved
           });
           
       }));
    
    
    
    },
   


   edit: (req, res) =>{

    //Recogemos el id de la url
    var cartId = req.params.id;

    var {name, items} = req.body

    Cart.findOneAndUpdate({_id: cartId}, {$set: {name, items}})

    

},

}; 

module.exports = controller;