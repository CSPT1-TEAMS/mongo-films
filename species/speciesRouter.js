const express = require('express');

const Species = require('./Species.js');

const router = express.Router();

router.get('/', (req, res) => {
    Species.find()
    .then((species) => {
        res.status(200).json(species)
    })
})

module.exports = router;
