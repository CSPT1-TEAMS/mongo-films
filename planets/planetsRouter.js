const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router.get('/', (req, res) => {
    Planet.find()
    .then((planets) => {
        res.status(200).json(planets)
    })
})
module.exports = router;
