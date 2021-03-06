var express = require('express')
var router = express.Router()
var User = require('../models').users
var Role = require('../models').roles
var view = require('../views')
var Models = require('../models')
const bcrypt = require("bcrypt");
const pageLimit = 10
const nodemailer = require("nodemailer");
const Auth = require('./authenticate')

//PAGINATION Function
const paginate = (query, { page, pageSize }) => {
    // const offset = page * pageSize;
    const limit = pageLimit;
    const offset = 0 + (page - 1) * limit;
    return {...query,offset,limit};
};

router.get('/', async (req, res, next) => {
 	const count_user = await User.count({})
    const totalPage = Math.ceil(count_user/pageLimit)

	let page = +req.query.page;
    let pageSize = count_user;
 	const users = await User.findAll(paginate(
    	{
            where: {}, // conditions
            order: [
                ['id', 'DESC']
            ]
	    },
    	{ page, pageSize },
  	),{
 		include: [ Role ]
  	})

	if (users.length !== 0) {
        res.status(200).json({
            'status': 'ok','pageSize': totalPage,'data': users,
        })
	} else {
		res.json(view('users empty'))
	}
})

router.get('/:id', Auth, async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
        include: [ Role ]
    })

    if (user.length !== 0) {
        res.json(view(user))
    } else {
        res.json(view('user empty'))
    }
})

router.post('/', Auth, async (req, res, next) => {
    try {
        const {
            username,name,email,password,phone,gender,birth,
            // height,
            // weight,
            role_id
        } = req.body;
        const users = await Models.users.create({
            username,name,email,password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),phone,gender,birth,
            // height,
            // weight,
            role_id
        });
        if (users) {
            // res.status(201).json({
            //   'status': 'OK',
            //   'messages': 'User berhasil ditambahkan',
            //   'data': users,
            // })
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "fsbngpu@gmail.com", // generated ethereal user
                    pass: "envisionsapp123!", // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"NikreuhApps" <armannugraha85@gmail.com>', // sender address
                to: email,
                subject: "Konfirmasi Akun", // Subject line
                text: "Selamat datang di layanan aplikasi Nikreuh, Sebelum kamu menggunakan aplikasi ini, kamu diharuskan untuk mengkonfirmasi akun kamu terlebih dahulu dengan menekan link yang ada di bawah berikut ini.", // plain text body
                html: "<b>Selamat datang di layanan aplikasi Nikreuh, Sebelum kamu menggunakan aplikasi ini, kamu diharuskan untuk mengkonfirmasi akun kamu terlebih dahulu dengan menekan link yang ada di bawah berikut ini.</b>", // html body
            });
            res.json(view(users))
        }
    } catch (err) {
       // res.status(400).json({
       //   'status': 'ERROR',
       //   'messages': err.message,
       //   'data': {},
       // })
       res.json(view(err.errors[0].message))
    }
})

router.patch('/:id', Auth, async function (req, res, next) {
    try {
        const usersId = req.params.id;
        const {
            username,name,email,password,phone,gender,birth,
            // height,
            // weight,
            role_id
        } = req.body;

        var updateData;

        var check = [null, "null"];

        if (check.indexOf(password) !== -1) {
            updateData = {
                username,name,email,phone,gender,birth,
                // height,
                // weight,
                role_id
            };
        }else{
            updateData = {
                username,name,email,password:bcrypt.hashSync(password, bcrypt.genSaltSync(10)),phone,gender,birth,
                // height,
                // weight,
                role_id
            };
        }

        const users = await Models.users.update(updateData, {
            where: {id: usersId}
        });
        if (users) {
            // res.json({
            //   'status': 'OK',
            //   'messages': 'User berhasil diupdate',
            //   'data': users,
            // })
            res.json(view(users))
        }
    } catch (err) {
        // res.status(400).json({
        //   'status': 'ERROR',
        //   'messages': err.message,
        //   'data': {},
        // })
        res.json(view(err.errors[0].message))
        // res.json(view(err))
    }
});

router.delete('/:id', Auth, async function (req, res, next) {
    try {
        const usersId = req.params.id;
        const users = await Models.users.destroy({ where: {id: usersId}})
        if (users) {
            res.json({
                'status': 'OK',
                'messages': 'User berhasil dihapus',
                'data': users,
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