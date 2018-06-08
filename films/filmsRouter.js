const express = require('express');

const Film = require('./Film.js');
const Character = require('../characters/Character.js')

const router = express.Router();

router.get('/', (req, res) => {
    const { producer , released } = req.query
    if( producer !== undefined ) {
        const filter = new RegExp(producer, 'i')
        Film.find({ producer: filter }).sort( { episode: 1 } ).select(
            '_id episode producer title director release_date opening_crawl characters planets'
        )
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .then((films) => {
            res.status(200).json(films)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    } else if( released !== undefined ) {
        const filter = new RegExp(released, 'i')
        Film.find({ release_date: filter }).sort( { episode: 1 } ).select(
            '_id episode producer title director release_date opening_crawl characters planets'
        )
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter -_id')
        .then((films) => {
            res.status(200).json(films)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    } else {
        Film.find().sort( { episode: 1 } ).select(
            '_id episode producer title director release_date opening_crawl characters planets'
        )
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .then((films) => {
            res.status(200).json(films)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    }
})

module.exports = router;
