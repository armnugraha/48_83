const express = require('express')
const jwt = require('../jwt')
const router = express.Router()
const bcrypt = require("bcrypt");
const {Base64} = require('js-base64');
var User = require('../models').users
var view = require('../views')

router.post('/', async function (req, res, next) {

    let user = await User.findAll({
        where: {
            username: req.body.username
        }
    })

    if (user.length === 0) {
        res.send(view('username atau password salah'))
    } else {
        user = user[0]
        const match = await bcrypt.compare(req.body.password, user.password);

        if(match) {
            var token = jwt.sign({ id: user.id, email: user.email, role_id: user.role_id, username: user.username, name: user.name })
            res.send(view(token))
        }else{
            res.send(view('password salah'))
        }
    }
})

router.get('/refresh', async function (req, res, next) {
    let getDataToken = req.query.token;
    let splitToken = getDataToken.split(".",2);

    let decodeToken = Base64.decode(splitToken[1])
    let splitDataToken = decodeToken.split(":",4);

    let getSplitId = splitDataToken[1];
    let splitDataId = getSplitId.split(",",1);
    let getId = splitDataId[0];

    let user = await User.findByPk(getId)

    var token = jwt.sign({ id: user.id, email: user.email, role_id: user.role_id, username: user.username, name: user.name })

    res.send(view(token))
})

router.get('/logout', function (req, res, next) {
    res.send('respond with a resource')
})

// router.get('/reset', function (req, res, next) {
//   res.send('reset password')
// })

module.exports = router