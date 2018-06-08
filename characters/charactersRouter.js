const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Film = require('../films/Film.js');


const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        const { gender, minheight } = req.query;
        
        Character.find()
        .then(characters => {

            if(gender && minheight !== undefined) {
                const queryFilter = characters.filter(char => {
                    return char.gender === gender && char.height >= Number(minheight)
                });

                res.status(200).json(queryFilter);

            } else {

                res.status(200).json(characters);
            }

        })

    });

    router
        .route('/:id')
        .get((req, res) => {
            const { id } = req.params;

            Character.findById(id)
            .populate('homeworld', 'name')
            .then(character => {
                Film.find({ characters: id })
                    .select('episode')
                        .then(film => {
                            res.status(200).json([character, film])
                        })
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friend with the specified ID does not exist." });
            })
    });

    router
        .route('/:id/vehicle')
        .get((req, res) => {
            const { id } = req.params;
        
            Vehicle.find({ pilots: id })
            .then(pilots => {
                res.status(200).json(pilots);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The planets information could not be retrieved." });
            })
    });

module.exports = router;
