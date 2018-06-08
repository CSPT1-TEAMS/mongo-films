const express = require('express');

const Film = require('./Film.js');

const router = express.Router();


router
    .route('/')
    .get((req, res) => {
        const { producer, released } = req.query;
        const query = Film.find()
        
        .select('title producer episode release_date')
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .sort({ episode: 'asc' })

        if(producer !== undefined) {
            const filmProducers = new RegExp(producer, 'i');
            query.where({ producer: filmProducers })
        }
        if(released !== undefined) {
            const filmRelease = new RegExp(released, 'i');
            query.where({ release_date: filmRelease })
        }
        query
            .then(films => {
                res.status(200).json(films)
            })
            .catch(err => {
                res.status(500).json({ error: 'No producer by that name exists'})
            });
    });

module.exports = router;
