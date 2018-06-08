const express = require('express');

const Character = require('./Character.js');
const Vehicles = require('../vehicles/Vehicle.js');
const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  let { minheight, gender } = req.query;
  // console.log(req.query);
  let query = Character.find()
    .select('name gender height skin_color hair_color eye_color');

  if (minheight) {
    const heightFilter = new RegExp(minheight, 'i');
    query.where({ minheight: heightFilter });
  }
  if (gender) {
    const genderFilter = new RegExp(gender, 'i');
  }
  query.then(characters => {
    res.status(200).json(characters);
  })
  .catch( error => {
    res.status(500).json({error: "Error retrieving from database."});
  })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Character.findById(id)
      // this is what populates character info with home planet info
      .populate('homeworld', 'name climate')
      .then(char => res.status(200).json(char))
      .catch(err => res.status(500).json(err))
})

router.get('/:id/vehicles', (req, res) => {
  Vehicles.find()
    .select('vehicle_class')
    .then( vehicles => res.status(200).json({ vehicles: vehicles }))
    .catch( err => res.status(500).json(err));
})
module.exports = router;
