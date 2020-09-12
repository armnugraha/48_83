var express = require('express')
var router = express.Router()
var Models = require('../models')
var Role = require('../models').roles
var view = require('../views')

router.get('/', async function (req, res, next) {
    const roles = await Role.findAll({
        order: [
            ['id', 'DESC']
        ]
    })

    if (roles.length !== 0) {
        res.json(view(roles))
    } else {
        res.json(view('roles empty'))
    }
})

router.get('/:id', async function (req, res, next) {
    const roles = await Role.findByPk(req.params.id)
    if (roles.length !== 0) {
        res.json(view(roles))
    } else {
        res.json(view('roles empty'))
    }
})

module.exports = router