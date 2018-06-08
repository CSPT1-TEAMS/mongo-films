const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get("/", (req, res) => {
    let { producer } = req.query;
    let { released } = req.query;
    let query, producer_name;
    if (producer !== undefined) {
        producer_name = new RegExp(producer, 'i');
        if (released !== undefined) {
            release_date = new RegExp(released)
            query = Film.find({ producer: producer_name, release_date: release_date })
        } else {
            query = Film.find({ producer: producer_name })
        }
    } else {
        if (released !== undefined) {
            release_date = new RegExp(released)
            query = Film.find({ release_date: release_date })
        } else {
            query = Film.find()
        }
    }
    query.sort('episode')
    // Film.find({ producer: { $regex: producer, $options: 'i' } }).sort('episode')
    .select("episode title producer director release_date planets characters")
    .populate('planets', 'name climate terrain gravity diameter-_id')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .then(films => {
        return res.status(200).json(films);
    })
    .catch(error => {
        return res.status(500).json({
            errorMessage: "Something went wrong. Please try again later."
        })
    })
})

module.exports = router;
