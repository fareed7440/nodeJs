var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
 var BearSchema = new Schema({
     name : {type:String},
    text:String,
 
    data:String
 });

 module.exports = mongoose.model("Bear",BearSchema );