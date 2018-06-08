const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');
const router = express.Router();

// add endpoints here

router.get("/", (req, res) => {
    Character.find()
    .then(characters => res.status(200).json(characters))
})

router.get("/:id", (req, res) => {
    let { id } = req.params;
    const charById = Character.findById(id)
        .select('name gender skin_color hair_color height eye_color birth_year')
        .populate('homeworld')
    const movies = Film.where({ characters: id })
        .select('title producer director episode release_date')
    Promise.all([charById, movies])
        .then(response => {
            res.status(200).json({ ...response[0]._doc, movies: response[1] })
        })
        .catch(err => res.status(500).json({ err: err.message }))
})

router.get("/:id/vehicles", (req, res) => {
    let { id } = req.params
    const charById = Character.findById(id)
        .select('name gender skin_color hair_color height eye_color birth_year')
    const vehicles = Vehicle.where({ pilots: id })
        .select('vehicle_class')
    Promise.all([charById, vehicles])
        .then(response => {
            res.status(200).json({ ...response[0]._doc, vehicles: response[1] })
        })
        .catch(error => console.log(error))
})

module.exports = router;
