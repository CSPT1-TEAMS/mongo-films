const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router.get('/', (req, res) => {
    Starship.find()
    .then((starships) => {
        res.status(200).json(starships)
    })
})
module.exports = router;
