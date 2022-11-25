
'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({

    name: String,
    items: Array,
    
    

});

module.exports = mongoose.model('cart', cartSchema);