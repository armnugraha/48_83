var express = require('express')
var router = express.Router()
var view = require('../views')
var Models = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pageLimit = 10

//PAGINATION Function
const paginate = (query, { page, pageSize }) => {
  // const offset = page * pageSize;
  const limit = pageLimit;
  const offset = 0 + (page - 1) * limit;
  return {
    ...query,
    offset,
    limit,
  };
};

router.get('/all', async function (req, res, next) {
    const gears = await Models.gears.findAll({})
    if (gears.length !== 0) {
        res.json(view(gears))
    } else {
        res.json(view('gears empty'))
    }
})

router.get('/gear_available/:id', async (req, res, next) => {
    const gear_unselected = await Models.outdoor_gears.findAll({
        where: { mount_id: req.params.id },
    })

    var setToArray = []

    gear_unselected.forEach(item => { 
        setToArray.push(item.gear_id)
    });

    const gears = await Models.gears.findAll({
        where: {
            id: {
                [Op.notIn]: setToArray
            }
        }
    })
    
    if (gears.length !== 0) {
        res.json(view(gears))
    } else {
        res.json(view('gears empty'))
    }
})

router.get('/gear_sets/:id', async (req, res, next) => {
    const gears = await Models.outdoor_gears.findAll({
        where: { mount_id: req.params.id },
        include: [ Models.gears ]
    })

    if (gears.length !== 0) {
        res.json(view(gears))
    } else {
        res.json(view('gears empty'))
    }
})

router.post('/add_gear', async (req, res, next) => {
    try {
        const {mount_id,gear_id} = req.body;
        const outdoor_gears = await Models.outdoor_gears.create({
            mount_id,gear_id
        });
        if (outdoor_gears) {
            res.json(view(outdoor_gears))
        }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.delete('/gear/:id', async function (req, res, next) {
    try {
        const getId = req.params.id;
        const outdoor_gears = await Models.outdoor_gears.destroy({ where: {
            id: getId
        }})
        if (outdoor_gears) {
          res.json({
            'status': 'ok',
            'messages': 'Data berhasil dihapus',
            'data': outdoor_gears,
          })
        }
    } catch (err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message,
            'data': {},
        })
    }
});

// condition (clear / sun (0), rainy & Thunderstorm & clouds(1)) jika kondisi hujan tampilkan yg kondisi nya hujan saja, apabila panas tampilkan semua
// type (normal (0), ultralight (1))

router.get('/gear_sets/:id/:condition/:type', async (req, res, next) => {
    const gears = await Models.outdoor_gears.findAll({
        attributes: ['id', 'mount_id', 'gear_id'],
        where: { mount_id: req.params.id },
        include: [
            {model: Models.gears, include: [{model: Models.gear_items,
                where: {
                    [Op.and]: [
                        {condition: req.params.condition},
                        {type: req.params.type}
                    ]
                }
            }]}
        ]
    })

    if (gears.length !== 0) {
        res.json(view(gears))
    } else {
        res.json(view('gears empty'))
    }
})

module.exports = router