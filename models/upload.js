const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/pinterest_clone',{useNewUrlParser:true,useUnifiedTopology:true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("read");
});

var uploadSchema = new mongoose.Schema({
    imagename:String,
    name:String,
    detail: String
})

var uploadModel = mongoose.model('image',uploadSchema)

module.exports = uploadModel