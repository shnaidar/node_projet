const express = require("express");
const app = express();
const port = 3000;
const path=require("path");
const mysql=require("mysql");
const { connect } = require("http2");

// configuration
var hbs = require('express-hbs');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"isett",
}
)
connection.connect();
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',

  }));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');
//les rootes

app.get("/",function(req,res){
    var sql = "select * from certif"
    connection.query(sql,function(error,results){
        console.log(results)
        res.render("index",{
            layout:"main",
            contenu: results
        })
    })
})

app.get("/login",function(req,res){
    res.sendFile(
        path.join(__dirname , "views/login.html")
    )
})

app.post("/login",function(req,res){
    var cin=req.body.cin;
    var password=req.body.password;
    var sql = "select * from certif where cin=? and password=?"
    connection.query(sql,[cin,password],function(error,results){
        if (results.length>0){
            console.log("l'utilisateur est connecte");
        }
        else{
            console.log("erreur de connexion");
        }
    }) 
})

app.listen(port);