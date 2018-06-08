const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Specie.find()
        .then(specieObj => {
            res.status(200).json(specieObj);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The species information could not be retrieved." });
        })
    });

module.exports = router;
