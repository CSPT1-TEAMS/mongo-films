const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
// so here we go

router.get('/', (req, res) => {
    // created two variables on one line using object destructuring
    const { producer, released } = req.query;
    let query = Film.find()
        .sort('episode')
        .select('episode title producer released_date')
    // .populate('planets', 'name climate terrain gravity diameter -_id')
    // .populate('characters', 'name')
    if (producer) {
        // javascript regular expression
        const filter = new RegExp(producer, 'i')
        query.where({ producer: filter })
    }
    // native mongo regular expression
    /*
    if (released) {
        query.where({ release_date: { $regex: released, $options: 'i' } })
    }
    */
    
    if (released) {
        const releasedFilter = new RegExp(released, 'i')
        query.where({ release_date: releasedFilter })
    }
    
    query.then(films => res.status(200).json(films))
        .catch(err => res.sendStatus(500))
})

module.exports = router;