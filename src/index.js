'use strict'

const express = require('express');




const Cart = require('./models/cart')

/*
body-parser es un paquete de NPM que analiza los cuerpos de las solicitudes entrantes en un middleware 
antes que sus controladores, disponible en la propiedad req.body. 
 */
const bodyParser = require('body-parser');
const app = express();
const port = 3900;

//**** Mongoose *******************************************************************:

var mongoose = require('mongoose');
//Dirección a la base de datos:
var url = 'mongodb+srv://ADMIN:ADMIN@cluster0.iwailrw.mongodb.net/test';
// var url = 'mongodb+srv://ADMIN:ADMIN@cluster0.iwailrw.mongodb.net/test';
//Configuración para evitar fallos en la conexión con mongoDB
mongoose.Promise = global.Promise;
//Forzamos que los métodos antiguos de mongodb se desactiven y podamos utilizar los nuevos
//mongoose.set('useFindAndModify', false);

//**** Ficheros ruta **************************************************************:

var product_routes = require('./routes/product');
var recipe_routes = require('./routes/recipe');
var cart_routes = require('./routes/cart');

app.put('/cart', async (req, res) => {
    const {id, email, cart } = req.body
    await Cart.updateOne({_id:id}, {$set:{email, cart}})
    res.json({ msg: "libro actualizado"})
  })



//**** Middlewares ****************************************************************:

/*
El middleware es el software que brinda servicios y funciones comunes a las aplicaciones.
Generalmente, se encarga de la gestión de los datos, los servicios de aplicaciones, la mensajería, la autenticación y 
la gestión de las API.
*/
var cors = require('cors')

app.use(cors())

//Cargamos el bodyParser: middleware para analizar cuerpos de a través de la URL
//Este analizador acepta solo la codificación UTF-8 contenida en el body
app.use(bodyParser.urlencoded({ extended: false }));

//Cualquier tipo de petición lo convertimos a json:
app.use(bodyParser.json());

//Activar el CORS para permitir peticiones AJAX y HTTP desde el frontend.
app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Origin: * ');
    next();
});

//Cargamos los archivos de ruta
app.use('/api/product', product_routes);
app.use('/api/recipe', recipe_routes);
app.use('/api/cart', cart_routes);




/*app.listen(port, () => {
    console.log('listening on port ' + port);
});*/

//Nos conectamos a mongoDB. Opción { useNewUrlParser: true } para utilizar las últimas funcionalidades de mongoDB
mongoose.connect(url, { useNewUrlParser: true }).then(() =>{

	console.log('Conexión con la BDD realizada con éxito!!!');

	app.listen(process.env.PORT || port, () =>{
		console.log('servidor ejecutándose en http://localhost:' + port);
	});

});
