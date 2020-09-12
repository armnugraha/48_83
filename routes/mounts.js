const express = require('express')
const jwt = require('../jwt')
const router = express.Router()
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $ilike: Op.ilike,
  $or: Op.or,
  $not: Op.not
}
var Mount = require('../models').mounts
var User = require('../models').users
var Announce = require('../models').mount_announcements
var view = require('../views')
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

router.get('/', async function (req, res, next) {
    const count_mount = await Mount.count({})
    const totalPage = Math.ceil(count_mount/pageLimit)

    let page = +req.query.page;
    let pageSize = count_mount;
    const mounts = await Mount.findAll(paginate(
        {
            include:[{model: User},{model: Announce,
                where: {
                    [Op.and]: [
                        {start_date: {
                          // use between ?
                            [Op.lte]: moment().toDate()
                        }},
                        {end_date: {
                          // use between ?
                            [Op.gte]: moment().toDate()
                        }}
                    ]
                },
                order: [
                    ['end_date', 'DESC']
                ],
                limit: 1
            }],
            where: {}, // conditions
            order: [
                ['id', 'ASC']
            ],
        },
        { page, pageSize },
    ))

    if (mounts.length !== 0) {
        res.status(200).json({
            'status': 'ok',
            'pageSize': totalPage,
            'data': mounts,
        })
    } else {
        res.json(view('mounts empty'))
    }

})

router.get('/:id', async (req, res, next) => {
    const mounts = await Mount.findOne({
        where: { id: req.params.id },
        include:[{model: Announce,
            where: {
                [Op.and]: [
                    {start_date: {
                        [Op.lte]: moment().toDate()
                    }},
                    {end_date: {
                        [Op.gte]: moment().toDate()
                    }}
                ]
            },
            order: [
                ['end_date', 'DESC']
            ],
            limit: 1
        }],
        limit: 1
    })

    if (mounts.length !== 0) {
        res.json(view(mounts))
    } else {
        res.json(view('mounts empty'))
    }
})

router.get('/setting_mount/:user_id', async (req, res, next) => {
    const users = await User.findByPk(req.params.user_id)

    const mounts = await Mount.findOne({
        where: { user_id: users.id },
        limit: 1
    })

    if (mounts.length !== 0) {
        res.json(view(mounts))
    } else {
        res.json(view('mounts empty'))
    }
})

router.get('/mount/:id', async (req, res, next) => {
    try {
        const mounts = await Mount.findByPk(req.params.id)

        var data_pick = []
        var data_time = []
        var data_distance = []

        for(var i=0; i < mounts.place.length; i++){
            if (i == 0) {
                data_pick.push(mounts.place[i].properties.title)
                data_time.push(-1)
                data_distance.push(-1)
            }

            if(i < mounts.place.length-1){
                var j = i+1;
                // var now = moment(mounts.place[i].properties.created_at, "HH:mm:ss");
                // var end = moment(mounts.place[j].properties.created_at, "HH:mm:ss");
                // var duration = moment.duration(now.diff(end));
                // var minutes = duration.asMinutes();

                var lat1 = mounts.place[i].geometry.coordinates[1]
                var lat2 = mounts.place[j].geometry.coordinates[1]
                var lon1 = mounts.place[i].geometry.coordinates[0]
                var lon2 = mounts.place[j].geometry.coordinates[0]
                
                var R = 6371;
                var dLat = (lat2-lat1) * (Math.PI/180);
                var dLon = (lon2-lon1) * (Math.PI/180); 
                var a = 
                  Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos((lat1)*(Math.PI/180)) * Math.cos((lat2)*(Math.PI/180)) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2)
                ; 
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                var d = R * c; // Distance in km

                var set_minute = Math.round(d*1000)
                if(set_minute >= 30){ //30 meter/menit kecepatan
                    data_time.push((set_minute/30).toFixed(0))
                }else{
                    data_time.push(1)
                }

                data_distance.push(set_minute)

                data_pick.push(mounts.place[i].properties.title+" - "+mounts.place[j].properties.title)
            }
        }

        if (mounts.length !== 0) {
            res.status(200).json({
                'status': 'ok','data_place': mounts,'data_pick':data_pick,'data_time':data_time,'data_distance':data_distance
            })
        } else {
            res.json(view('mounts empty'))
        }

    } catch (err) {
        next(err);
    }
})

router.get('/search/:text', async (req, res, next) => {

    let keyword = "%"+req.params.text+"%"

    const mounts = await Mount.findAll({
        where: {
            [Op.or]: [
                {name: {
                    [Op.iLike]: keyword
                }},
                {address: {
                    [Op.iLike]: keyword
                }}
            ]
        },
        include:[{model: User},{model: Announce,
            where: {
                [Op.and]: [
                    {start_date: {
                        [Op.lte]: moment().toDate()
                    }},
                    {end_date: {
                        [Op.gte]: moment().toDate()
                    }}
                ]
            },
            order: [
                ['end_date', 'DESC']
            ],
            limit: 1
        }]
    })

    if (mounts.length !== 0) {
        res.json(view(mounts))
    } else {
        res.json(view('mounts empty'))
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {user_id,name,address,altitude,thumb,type,desc,price,start_time,end_time,full_time,start_day,center_coordinate,place,track_line} = req.body;
        const mounts = await Mount.create({
            user_id,name,address,altitude,thumb,type,desc,price,start_time,end_time,full_time,start_day,center_coordinate,place,track_line
        });
    if (mounts) {
        res.json(view(mounts))
    }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.post('/create_cms', async (req, res, next) => {
    try {
        const {user_id,name,address,altitude,thumb,type,desc,price} = req.body;
        const mounts = await Mount.create({
            user_id,name,address,altitude,thumb,type,desc,price,
            full_time:true,
            start_day:["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"],
            center_coordinate:[107.609810,-6.914744],
            place:[],
            track_line:[]
        });
    if (mounts) {
        res.json(view(mounts))
    }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.post('/announce_post', async (req, res, next) => {
    try {
        const {mount_id,title,note,start_date,end_date} = req.body;
        const announce = await Announce.create({
            mount_id,title,note,start_date,end_date
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

router.patch('/:id', async (req, res, next) => {
    const get_mount = await Mount.findByPk(req.params.id)

    try {
        const mountId = req.params.id;
        const {user_id,name,address,altitude,thumb,type,desc,price,start_time,end_time,full_time,start_day,center_coordinate,place,track_line} = req.body;
        
        var updateData;

        var check = [null, "null"];

        if (check.indexOf(place) !== -1) {
            updateData = {name,address,altitude,thumb,type,desc,price,start_time,end_time,full_time,start_day,center_coordinate,
                user_id:get_mount.user_id,
                place:get_mount.place,
                track_line:get_mount.track_line
            };
        }else{
            updateData = {
                user_id,name,address,altitude,thumb,type,desc,price,start_time,end_time,full_time,start_day,center_coordinate,place,track_line
            };
        }
        const mounts = await Mount.update(updateData,{
            where: {
                id: mountId
            }
        });
        if (mounts) {
            res.json(view(mounts))
        }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.patch('/update_cms/:id', async (req, res, next) => {
    const get_mount = await Mount.findByPk(req.params.id)

    try {
        const mountId = req.params.id;
        const {user_id,name,address,altitude,thumb,type,desc,price,start_time,end_time,full_time,start_day,center_coordinate,place,track_line} = req.body;
        
        var updateData = {user_id,name,address,altitude,type,desc,price,
                start_time:get_mount.start_time,
                end_time:get_mount.end_time,
                full_time:get_mount.full_time,
                start_day:get_mount.start_day,
                center_coordinate:get_mount.center_coordinate,
                thumb:get_mount.thumb,
                place:get_mount.place,
                track_line:get_mount.track_line
            };

        const mounts = await Mount.update(updateData,{
            where: {
                id: mountId
            }
        });
        if (mounts) {
            res.json(view(mounts))
        }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.patch('/update_track/:id', async (req, res, next) => {
    const get_mount = await Mount.findByPk(req.params.id)

    try {
        const mountId = req.params.id;
        const {place,track_line} = req.body;
        
        var updateData = {
                name:get_mount.name,
                address:get_mount.address,
                altitude:get_mount.altitude,
                thumb:get_mount.thumb,
                type:get_mount.type,
                desc:get_mount.desc,
                price:get_mount.price,
                start_time:get_mount.start_time,
                end_time:get_mount.end_time,
                full_time:get_mount.full_time,
                start_day:get_mount.start_day,
                center_coordinate:get_mount.center_coordinate,
                user_id:get_mount.user_id,
                place,
                track_line
            };
        
        const mounts = await Mount.update(updateData,{
            where: {
                id: mountId
            }
        });
        if (mounts) {
            res.json(view(mounts))
        }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.delete('/:id', async function (req, res, next) {
    try {
        const getId = req.params.id;
        const mounts = await Mount.destroy({ where: {
            id: getId
        }})
        if (mounts) {
            res.json(view(mounts))
        }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
});

router.delete('/announce_delete/:id', async function (req, res, next) {
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
        res.json(view(err.errors[0].message))
    }
});

module.exports = router