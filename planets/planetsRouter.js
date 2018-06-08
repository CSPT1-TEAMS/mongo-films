const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Species = require('../species/Specie');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Planet.find()
        .then(planetObj => {
            res.status(200).json(planetObj);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The planets information could not be retrieved." });
        })
    });

    router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        const character = Character.find({ homeworld: id })
        const speciez = Species.find({ homeworld: id })

        Promise.all([character, speciez])
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The planets information could not be retrieved." });
        })
    });

module.exports = router;
