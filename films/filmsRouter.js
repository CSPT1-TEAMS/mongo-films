const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/',(req,res) => {
    const filmproducer = req.query.producer;
    const released = req.query.released;
    const query = Film.find()
    query.sort('-episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets','name climate terrain gravity diameter')
    if(filmproducer !== undefined){
        query.where({producer: { $regex: '.*' + filmproducer + '.*', $options:'i' }})
    }
    if (released !== undefined) {
        query.where({release_date: {$regex: released}})
    }
    query.then(films => res.status(200).json(films))
        .catch(err => res.sendStatus(500))
    
})

module.exports = router;
