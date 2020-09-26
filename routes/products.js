var express = require('express')
var router = express.Router()
var Product = require('../models').products
var view = require('../views')
var Models = require('../models')
const jwt = require('../jwt')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pageLimit = 10
const nodemailer = require("nodemailer");
const Auth = require('./authenticate')

//PAGINATION Function
const paginate = (query, { page, pageSize }) => {
    const limit = pageLimit;
    const offset = 0 + (page - 1) * limit;
    return {...query,offset,limit};
};

router.get('/', Auth, async (req, res, next) => {
 	const count = await Product.count({})
    const totalPage = Math.ceil(count/pageLimit)

	let page = +req.query.page;
    let pageSize = count;
 	const data = await Product.findAll(paginate(
    	{
            where: {},
            order: [
                ['id', 'DESC']
            ]
	    },
    	{ page, pageSize },
  	))

	if (data.length !== 0) {
        res.status(200).json({
            'status': 'ok','pageSize': totalPage,'data': data,
        })
	} else {
		res.json(view('data empty'))
	}
})

router.get('/:id', Auth, async (req, res, next) => {

    const data = await Product.findByPk(req.params.id)

    if (data.length !== 0) {
        res.json(view(data))
    } else {
        res.json(view('data empty'))
    }
})

router.get('/name/:value', Auth, async (req, res, next) => {

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

router.post('/', Auth, async (req, res, next) => {
    try {
        const {company_id,category_id,unit_id,name,price,discount} = req.body;
        const data = await Models.products.create({company_id,category_id,unit_id,name,price,discount});
        if (data) {
            res.json(view(data))
        }
    } catch (err) {
       res.json(view(err.errors[0].message))
    }
})

// router.patch('/:id', Auth, async function (req, res, next) {
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

// router.delete('/:id', Auth, async function (req, res, next) {
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