var express = require('express')
var router = express.Router()
var Sensor = require('../models').sensor
var view = require('../views')

router.get('/', async (req, res, next) => {
  const sensors = await Sensor.findAll({})
  if (sensors.length !== 0) {
    res.json(view(sensors))
  } else {
    res.json(view('sensors empty'))
  }
})

router.get('/station_id/:id', async (req, res, next) => {
  const sensors = await Sensor.findAll({
    where: { station_id: req.params.id }
  })

  if (sensors.length !== 0) {
    res.json(view(sensors))
  } else {
    res.json(view('sensors empty'))
  }
})

module.exports = router
