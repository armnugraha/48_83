var express = require('express')
var router = express.Router()
var Announce = require('../models').mount_announcements
var Mount = require('../models').mounts
var view = require('../views')
var Models = require('../models')
const moment = require('moment');
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

var sendNotification = function(data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic Y2E5ZjliNDctZmYzOC00NDVmLWIzODItYmZmNGMxYjAwMzZh"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };
  
    var https = require('https');
    var req = https.request(options, function(res) {  
        res.on('data', function(data) {
            // console.log("Response:");
            // console.log(JSON.parse(data));
        });
    });
  
    req.on('error', function(e) {
        // console.log("ERROR:");
        // console.log(e);
    });
  
    req.write(JSON.stringify(data));
    req.end();
};

router.get('/', async (req, res, next) => {
 	const count_announce = await Announce.count({})
    const totalPage = Math.ceil(count_announce/pageLimit)

	let page = +req.query.page;
    let pageSize = count_announce;
 	const announce = await Announce.findAll(paginate(
    	{
            where: {}, // conditions
            order: [
                ['id', 'DESC']
            ]
	    },
    	{ page, pageSize },
  	))

	if (announce.length !== 0) {
        res.status(200).json({
            'status': 'ok','pageSize': totalPage,'data': announce,
        })
	} else {
		res.json(view('announce empty'))
	}
})

router.get('/detail/:mount_id/', async function (req, res, next) {
    const announce = await Announce.findAll({
        where: {
            [Op.and]: [
                {mount_id: req.params.mount_id},
                {end_date: {
                    [Op.gte]: moment().toDate()
                }}
            ]
        },
        order: [
            ['end_date', 'DESC']
        ]
    })

    if (announce.length !== 0) {
        res.json(view(announce))
    } else {
        res.json(view('announce empty'))
    }
})

router.get('/:id', async (req, res, next) => {
    const announce = await Announce.findByPk(req.params.id, {
        // include: [ Mount ]
    })

    if (announce.length !== 0) {
        res.json(view(announce))
    } else {
        res.json(view('announce empty'))
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {mount_id,title,note,start_date,end_date,file} = req.body;
        const announce = await Announce.create({
            mount_id,title,note,start_date,end_date,file
        });
        const mounts = await Mount.findByPk(mount_id)

        if (announce) {
            var message = { 
                app_id: "bed7e669-3057-4f11-b27a-0586250aa0f1",
                contents: {"en": "Penutupan Gunung "+ mounts.name+" : "+title},
                included_segments: ["All"]
            };
            sendNotification(message);
            res.json(view(announce))
        }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.patch('/:id', async function (req, res, next) {
    try {
        const getId = req.params.id;
        const {mount_id,title,note,start_date,end_date,file} = req.body;

        var updateData = {mount_id,title,note,start_date,end_date,file};

        const announce = await Announce.update(updateData, {
            where: {id: getId}
        });
        if (announce) {
            res.json(view(announce))
        }
    } catch (err) {
        res.json(view(err))
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const getId = req.params.id;
        const get_announce = await Announce.findByPk(getId)
        const mounts = await Mount.findByPk(get_announce.mount_id)
        const announce = await Announce.destroy({ where: {
            id: getId
        }})
        if (announce) {
            var message = { 
                app_id: "bed7e669-3057-4f11-b27a-0586250aa0f1",
                contents: {"en": mounts.name + " dapat kamu kunjungi kembali :)"},
                included_segments: ["All"]
            };
            sendNotification(message);
            res.json({
                'status': 'ok',
                'messages': 'Pengumuman berhasil dihapus',
                'data': announce,
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

module.exports = router