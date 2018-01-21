var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  header : { type : String, required : true},
  image : { type : String},
  desc : { type : String, required : true}
});

module.exports = mongoose.model('User', userSchema, 'news');
