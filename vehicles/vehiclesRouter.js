const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    const {id} = req.params
    Vehicle.find({pilots: id})
    .populate('pilots', '-homeworld')
    .then((vehicles) => {
        res.status(200).json(vehicles)
    })
})
module.exports = router;
