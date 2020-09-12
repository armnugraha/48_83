var express = require('express')
var router = express.Router()
var Product = require('../models').products
var view = require('../views')
var Models = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pageLimit = 10
const nodemailer = require("nodemailer");

//PAGINATION Function
const paginate = (query, { page, pageSize }) => {
    const limit = pageLimit;
    const offset = 0 + (page - 1) * limit;
    return {...query,offset,limit};
};

// router.get('/', async (req, res, next) => {
//  	const count_user = await Product.count({})
//     const totalPage = Math.ceil(count_user/pageLimit)

// 	let page = +req.query.page;
//     let pageSize = count_user;
//  	const users = await Product.findAll(paginate(
//     	{
//             where: {},
//             order: [
//                 ['id', 'DESC']
//             ]
// 	    },
//     	{ page, pageSize },
//   	),{
//  		include: [ Role ]
//   	})

// 	if (users.length !== 0) {
//         res.status(200).json({
//             'status': 'ok','pageSize': totalPage,'data': users,
//         })
// 	} else {
// 		res.json(view('users empty'))
// 	}
// })

router.get('/:id', async (req, res, next) => {

    const product = await Product.findByPk(req.params.id)

    if (product.length !== 0) {
        res.json(view(product))
    } else {
        res.json(view('product empty'))
    }
})

router.get('/name/:value', async (req, res, next) => {

    let keyword = "%"+req.params.value+"%"

    const product = await Product.findAll({
        where: {
            name: {
                [Op.iLike]: keyword
            }
        }
    })

    if (product.length !== 0) {
        res.json(view(product))
    } else {
        res.json(view('product empty'))
    }
})

// router.post('/', async (req, res, next) => {
//     try {
//         const {
//             username,name,email,password,phone,gender,birth,
//             // height,
//             // weight,
//             role_id
//         } = req.body;
//         const users = await Models.users.create({
//             username,name,email,password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),phone,gender,birth,
//             // height,
//             // weight,
//             role_id
//         });
//         if (users) {
//             let testAccount = await nodemailer.createTestAccount();

//             // create reusable transporter object using the default SMTP transport
//             let transporter = nodemailer.createTransport({
//                 host: "smtp.gmail.com",
//                 port: 587,
//                 secure: false, // true for 465, false for other ports
//                 auth: {
//                     user: "fsbngpu@gmail.com", // generated ethereal user
//                     pass: "envisionsapp123!", // generated ethereal password
//                 },
//             });

//             // send mail with defined transport object
//             let info = await transporter.sendMail({
//                 from: '"NikreuhApps" <armannugraha85@gmail.com>', // sender address
//                 to: email,
//                 subject: "Konfirmasi Akun", // Subject line
//                 text: "Selamat datang di layanan aplikasi Nikreuh, Sebelum kamu menggunakan aplikasi ini, kamu diharuskan untuk mengkonfirmasi akun kamu terlebih dahulu dengan menekan link yang ada di bawah berikut ini.", // plain text body
//                 html: "<b>Selamat datang di layanan aplikasi Nikreuh, Sebelum kamu menggunakan aplikasi ini, kamu diharuskan untuk mengkonfirmasi akun kamu terlebih dahulu dengan menekan link yang ada di bawah berikut ini.</b>", // html body
//             });
//             res.json(view(users))
//         }
//     } catch (err) {
//        res.json(view(err.errors[0].message))
//     }
// })

// router.patch('/:id', async function (req, res, next) {
//     try {
//         const usersId = req.params.id;
//         const {
//             username,name,email,password,phone,gender,birth,role_id
//         } = req.body;

//         var updateData;

//         var check = [null, "null"];

//         if (check.indexOf(password) !== -1) {
//             updateData = {
//                 username,name,email,phone,gender,birth,role_id
//             };
//         }else{
//             updateData = {
//                 username,name,email,password:bcrypt.hashSync(password, bcrypt.genSaltSync(10)),phone,gender,birth,role_id
//             };
//         }

//         const users = await Models.users.update(updateData, {
//             where: {id: usersId}
//         });
//         if (users) {
//             res.json(view(users))
//         }
//     } catch (err) {
//         res.json(view(err.errors[0].message))
//     }
// });

// router.delete('/:id', async function (req, res, next) {
//     try {
//         const usersId = req.params.id;
//         const users = await Models.users.destroy({ where: {id: usersId}})
//         if (users) {
//             res.json({
//                 'status': 'OK',
//                 'messages': 'User berhasil dihapus',
//                 'data': users,
//             })
//         }
//     } catch (err) {
//         res.status(400).json({
//             'status': 'ERROR',
//             'messages': err.message,
//             'data': {},
//         })
//     }
// });

module.exports = router