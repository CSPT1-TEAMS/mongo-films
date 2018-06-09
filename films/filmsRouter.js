const express = require('express')
const router = express.Router()

const Film = require('./Film.js')


// add endpoints here
// ☞ c73e5146-e6db-481d-af2a-4f4d0b266e54

router.get('/', (req, res) => {
  Film.find()
    .sort('episode')
    .select('episode title planets characters')
    .populate('characters', '-_id name gender height skin_color hair_color eye_color') // you can chain populate as long as subsequent populates reference different models.
    .populate('planets', ' -_id name climate terrain gravity diameter')
    // .where().gt()
    .then(films => res.status(200).json(films))
})

router.get('/', (req, res) => {
// Find Films by producer Gary Kurtz(/api/films?producer=gary+kurtz)
// find all films released in 2005.(/api/films?release=2005)
  const {producer, released} = req.query
  // producer: 'Gary Kurtz, Raymon Smith' !== 'gary kurtz'
  const query = Film.find()
  if (producer !== undefined) {
    query.where({producer: { $regex: producer, $options: 'i' }}) // '$ is mongoose internal method
  }
  if (released !== undefined) {
    let releasedFilter = new RegExp(released, 'i')
    query.where({release_date: releasedFilter})
    // '1977-05-25' === '1977'
  }

  query.then(films => res.status(200).json(films))
    .catch((err => res.sendStatus(500), (err)))
  

/*
// ☞ f40185c8-0030-48ea-b1fd-cb0e2e10e685
router.get('/', (req, res) => {
  const { producer, released } = req.query
  let query = Film.find()
    .sort('-episode')
    .select('episode title producer released_date planets characters')
    // .populate('planets', 'name climate terrain gravity diameter')
    // .populate('characters', 'name') // you can chain populate as long as subsequent populates reference different models.
  if (producer !== undefined) {
    const filter = new RegExp(producer, 'i') // `i` is case insensitive
    query.where({producer: filter}) // stright javascript
  }
  if (released !== undefined) {
    query.where({release_date: {$regex: released, $options: 'i'}}) // `$` indicates native mongoDB method like `$in` COMMON for mongo shell statements
  }
  query.then(films => res.status(200).json(films))
    .catch(err => res.status(500).json(err))
})
*/

// film released in a specific year
// ☞ d529d380-6494-4b17-bf3d-d2af8fe61083

module.exports = router
