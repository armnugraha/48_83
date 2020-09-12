var express = require('express')
var router = express.Router()
var Models = require('../models')
var view = require('../views')

router.get('/', async (req, res, next) => {
  const stations = await Models.station.findAll({ include: [ Models.sensor ] })
  if (stations.length !== 0) {
    res.json(view(stations))
  } else {
    res.json(view('stations empty'))
  }
})

router.get('/role', async (req, res, next) => {
  const stations = await Models.roles.findAll({ include: [ Models.users ] })
  if (stations.length !== 0) {
    res.json(view(stations))
  } else {
    res.json(view('stations empty'))
  }
})

router.get('/user', async (req, res, next) => {
  const stations = await Models.users.findAll({ include: [ Models.roles ] })
  if (stations.length !== 0) {
    res.json(view(stations))
  } else {
    res.json(view('stations empty'))
  }
})

module.exports = router
