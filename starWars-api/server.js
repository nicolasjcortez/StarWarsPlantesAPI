const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//Inicinado o App
const app = express();
app.use(express.json());

// iniciando o DB
mongoose.connect(
    'mongodb://192.168.99.100:27017/starwarsapi', 
    { useNewUrlParser: true }
);
requireDir('./src/models');


//Rotas
app.use('/starwars', require("./src/routes"));

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.listen(3001);