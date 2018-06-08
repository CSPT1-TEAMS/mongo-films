const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
  const films = Film.find()
    .sort('episode')
    .select('title producer release_date')
    .populate('characters', '_id name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter');
  if (req.query) {
    if (req.query.producer) {
      films.where({ producer: new RegExp(req.query.producer, 'i') });
    } else if (req.query.released) {
      films.where({ release_date: new RegExp(req.query.released) });
    }
  }
  films.then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err.message));
});

module.exports = router;
