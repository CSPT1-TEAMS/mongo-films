const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Starship.find()
        .then(shipObj => {
            res.status(200).json(shipObj);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The starships information could not be retrieved." });
        })
    });

module.exports = router;
