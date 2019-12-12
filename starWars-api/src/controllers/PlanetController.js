const mongoose = require('mongoose');
const axios = require('axios');
//import axios from 'axios';

//const externalApi = axios.create({ baseURL: 'https://swapi.co/api' });

const Planet = mongoose.model('Planet');



module.exports = {

    //lista todas os planetas do banco
    async listAll( req, res) {
        const planets = await Planet.find()
            .catch(function() {
                return res.sendStatus(400);
            });

        return res.json(planets);
    },

    //cria um planeta novo no banco
    async create(req, res){
        
        //obtem quantidade de filmes 
        var i = 1;

        try{
            var hadPlanetFound = false;
            do 
            {
                var responseExtApi = await axios.get('https://swapi.co/api/planets/?page='+i);
                for( var j = 0;j < responseExtApi.data.results.length; j++ ){
                    var extPlanet = responseExtApi.data.results[j];
                    if(extPlanet.name == req.body.nome){
                        hadPlanetFound = true;
                        if(extPlanet.films.length != null)
                        {
                            req.body.qtdFilmes = extPlanet.films.length;
                            break;
                        }      
                    }
                }
                i++;
            }
            while(responseExtApi.data.next != null && !hadPlanetFound)
        }catch(error){
            return res.sendStatus(500);
        }
        
        const planet = await Planet.create(req.body)
            .catch(function() {
                return res.sendStatus(400);
            });

        
        return res.sendStatus(201);
    },

    async findById(req, res){
        const planet = await Planet.findById(req.params.id)
            .catch(function() {
                return res.sendStatus(404);
            });

        return res.json(planet);
    },

    async findByName(req, res){
        const planet = await Planet.findOne({"nome": req.params.name}, function(err, result){
            if(err){ return res.sendStatus(500); }
            if(!result) { return res.sendStatus(404); }
        });

        return res.json(planet);
    },

    async destroy(req, res){
        const planet = await Planet.findByIdAndRemove(req.params.id)
            .catch(function() {
                return res.sendStatus(404);
            });

        return res.send();
    }



}