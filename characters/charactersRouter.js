const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here




router.get('/:id',(req,res) => {
   let query = Character.findById(req.params.id).populate('homeworld')
   query.then(result => {
       res.status(200).json(result)
   })
})

router.get('/:id/vehicles',(req,res) => {
    const id = req.params.id

})

module.exports = router;
