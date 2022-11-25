
'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({

    name: String,
    imageLink: String,
    description: String,
    price: Number,
    macros: {protein: Number, carbohidrates: Number, fat: Number},
    

});

module.exports = mongoose.model('Product', productSchema);