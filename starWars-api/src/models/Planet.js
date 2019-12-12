const mongoose = require("mongoose");

const PlanetSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    clima: {
        type: String,
        required: true
    },
    terreno: {
        type: String,
        required: true
    },
    qtdFilmes: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Planet', PlanetSchema);