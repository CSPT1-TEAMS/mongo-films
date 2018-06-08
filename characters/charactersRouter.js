const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js')
const router = express.Router();

router.get('/', (req, res) => {
    const { minHeight } = req.query
    // if(minHeight !== undefined) {
    //     Character.find({ gender: 'female', height: {$gte: height }})
    //     .then((characters) => {
    //         res.status(200).json(characters)
    //     })
    //     .catch((error) => {
    //         res.status(500).json(error)
    //     })
    // } else {
    Character.find().where({gender:'female'}).where({height: '150'})
    .then((characters) => {
        res.status(200).json(characters)
    })
    .catch((error) => {
        res.status(500).json(error)
    })
// }
})

router.get('/:id', (req, res) => {
    const {id} = req.params
        Character.findById(id)
        .populate('homeworld')
        .then((character) => {
            res.status(200).json(character)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

router.get('/:id/vehicles', (req, res) => {
    const {id} = req.params
        const pilot = Character.findById(id).populate('homeworld')
        const vehicles = Vehicle.find({pilots:id}).populate('pilots', 'name -_id')

        Promise.all([pilot, vehicles])
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})
// router.get('/:id', (req, res) => {
//     const {id} = req.params
//      const character = Character.findById(id)
//     //  const movie = Film.find({id: id})

//      Promise.all([character, movie])
//      .then((response) => {
//          res.status(200).json({response})
//      })
//      .catch((error) => {
//          res.status(500).json(error)
//      })
//  })

module.exports = router;
