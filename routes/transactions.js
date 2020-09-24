var express = require('express')
var router = express.Router()
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

router.get('/', Auth, async (req, res, next) => {
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
            company_id,code,total_response,id_client,id_seller,items,cash,total_pay,total_back
        } = req.body;

        const transactions = await Models.transactions.create({
            company_id,code,total_response,id_client,id_seller,items,cash,total_pay,total_back
        })
        .then( function (res) {
            Models.transaction_histories.create({
                transaction_id:res.id,progress_status_id:5
            })
        })
        .then( function () {
            res.json(view("Success Insert"))
        });

        if (transactions) {
            // let testAccount = await nodemailer.createTestAccount();

            // // create reusable transporter object using the default SMTP transport
            // let transporter = nodemailer.createTransport({
            //     host: "smtp.gmail.com",
            //     port: 587,
            //     secure: false, // true for 465, false for other ports
            //     auth: {
            //         user: "fsbngpu@gmail.com", // generated ethereal user
            //         pass: "envisionsapp123!", // generated ethereal password
            //     },
            // });

            // // send mail with defined transport object
            // let info = await transporter.sendMail({
            //     from: '"NikreuhApps" <armannugraha85@gmail.com>', // sender address
            //     to: email,
            //     subject: "Konfirmasi Akun", // Subject line
            //     text: "Selamat datang di layanan aplikasi Nikreuh, Sebelum kamu menggunakan aplikasi ini, kamu diharuskan untuk mengkonfirmasi akun kamu terlebih dahulu dengan menekan link yang ada di bawah berikut ini.", // plain text body
            //     html: "<b>Selamat datang di layanan aplikasi Nikreuh, Sebelum kamu menggunakan aplikasi ini, kamu diharuskan untuk mengkonfirmasi akun kamu terlebih dahulu dengan menekan link yang ada di bawah berikut ini.</b>", // html body
            // });

            res.json(view(transactions))
        }
    } catch (err) {
       res.json(view(err.errors[0].message))
    }
})

router.delete('/:id', async function (req, res, next) {
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