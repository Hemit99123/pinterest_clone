const express = require("express");

var hbs = require("express-handlebars");

const multer = require("multer");
const path = require("path")
const imageModel = require("./models/upload");

const imageData = imageModel.find({})

const app = express();
var mongodb = require('mongodb');
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017/tiffin_finds');
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set("view engine", "hbs");

app.use(express.static("images"));

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("image"); 

app.get("/", (req, res) => {

    imageData.exec(function(err,data){
        if(err) throw err;

        console.log(data)

        res.render('home',{records:data})
    })
});


app.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Something went wrong");
    } else {
      var imageName = req.file.filename;
      var name = req.body.name;
      var detail = req.body.detail;
    

      var imageDetails = new imageModel({
        imagename: imageName,
        name:name,
        detail: detail
      });

      imageDetails.save(function (err, doc) {
        if (err) throw err;

        console.log("Image Saved");

        console.log(imageDetails)

        imageData.exec(function(err,data){
            if(err) throw err;


            res.render('home',{records:data,success:true})
        })
      });
    }
  });
});

app.get("/terms" , (req,res) => {
  res.render("terms")
})


  app.get("/view",(req,res)=>{

    var users=images.find({},(err,docs)=>{
    
    if(err) throw err;
    
    else{
    
    res.render("showdata",docs);
    
    }
    
    });
    
    });

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});
