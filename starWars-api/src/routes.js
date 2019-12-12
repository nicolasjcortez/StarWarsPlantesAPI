const express = require('express');
const routes = express.Router();

const PlanetController = require('./controllers/PlanetController');

routes.get('/planets', PlanetController.listAll);
routes.post('/planet', PlanetController.create);
routes.get('/planet/byId/:id', PlanetController.findById);
routes.get('/planet/byName/:name', PlanetController.findByName);
routes.delete('/planet/:id', PlanetController.destroy);
module.exports = routes;