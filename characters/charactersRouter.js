const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  console.log(req.query);
  if (req.query && req.query.minheight) {
    const characters = Character.find()
      .select('name gender height skin_color hair_color eye_color')
      .populate('homeworld', 'name climate terrain gravity diameter');
    characters.where({ gender: 'female' })
      .where('height').gt(req.query.minheight);
    characters.then(response => res.status(200).json(response))
      .catch(err => res.status(500).json({ message: err.message} ));
  }
});

router.get('/:id', (req, res) => {
  const character = Character.where({ _id: req.params.id })
    .select('name gender height skin_color hair_color eye_color')
    .populate('homeworld', 'name climate terrain gravity diameter');
  const movies = 
    Film.where({ characters: req.params.id })
    .select('title director producer release_date opening_crawl');
  character.then((char_response) => {
    movies.then((movies_response) => {
      res.status(200).json({ character: char_response, movies: movies_response });
    })
    .catch(err => res.status(500).json(err.message));
  })
  .catch(err => res.status(500).json(err.message));
});

router.get('/:id/vehicles', (req, res) => {
  const vehicles = Vehicle.where({ pilots: req.params.id })
    .select('vehicle_class');
  vehicles.then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
