
'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({

    name: String,
    imageLink: String,
    tutorialLink: String,
    description: String,
    macros: {protein: Number, carbohidrates: Number, fat: Number},
    recipe: String,
    



});

module.exports = mongoose.model('Recipe', recipeSchema);