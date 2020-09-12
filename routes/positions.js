var express = require('express')
var router = express.Router()
var Position = require('../models').position
var view = require('../views')

router.get('/', async (req, res, next) => {
  const positions = await Position.findAll({})
  if (positions.length !== 0) {
    res.json(view(positions))
  } else {
    res.json(view('positions empty'))
  }
})

router.get('/sensor_id/:id', async (req, res, next) => {
  const positions = await Position.findAll({
    where: { sensor_id: req.params.id }
  })

  if (positions.length !== 0) {
    res.json(view(positions))
  } else {
    res.json(view('positions empty'))
  }
})

module.exports = router
