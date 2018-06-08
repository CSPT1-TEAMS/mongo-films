const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    Character.find()
      .select('name gender height skin_color hair_color eye_color')
      .then( chars => res.status(200).json({chars: chars}))
      .catch( err => res.status(500).json(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .populate('homeworld', 'name climate')
      .then(char => res.status(200).json(char))
      .catch(err => res.status(500).json(err))
})

router.get('/:id/vehicle', (req, res) => {
  
})
module.exports = router;
