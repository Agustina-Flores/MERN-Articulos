'use strict'

const mongoose= require('mongoose');

var Schema = mongoose.Schema;

//datos
var ArticleSchema = new Schema({

   title: String,
    date: {type: Date , default: Date.now},
    content: String,
    author: String,
    image:String,
    ingredientes:Array,
});

module.exports = mongoose.model('Article' , ArticleSchema);

