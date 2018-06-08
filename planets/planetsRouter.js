const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Species = require('../species/Species.js');

const router = express.Router();

// add endpoints here

router.get('/:id', (req, res) => {
  const characters = Character.where({ homeworld: req.params.id });
  const species = Species.where({ homeworld: req.params.id });
  characters.then((chars_response) => {
    species.then((species_response) => {
      res.status(200).json({ characters: chars_response, species: species_response });
    })
    .catch(err => res.status(500).json({ message: err.message }));
  }).catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
