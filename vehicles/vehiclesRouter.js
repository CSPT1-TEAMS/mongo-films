const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Vehicle.find()
        .then(vehicleObj => {
            res.status(200).json(vehicleObj);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The vehicles information could not be retrieved." });
        })
    });

module.exports = router;
