const express = require('express')
const jwt = require('../jwt')
const router = express.Router()
var Review = require('../models').mount_reviews
var Models = require('../models')
var view = require('../views')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const pageLimit = 8

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

router.get('/', async function (req, res, next) {
    const reviews = await Review.findAll({})
    if (reviews.length !== 0) {
        res.json(view(reviews))
    } else {
        res.json(view('reviews empty'))
    }
})

router.get('/:id', async (req, res, next) => {
    const reviews = await Review.findAll({
        include: [ Models.users ],
        where: { mount_id: req.params.id },
        limit:10,
        order: [
            ['id', 'DESC']
        ]
    })

    const total_review = await Review.findAll({
        where: { mount_id: req.params.id },
    })

    if (reviews.length !== 0) {
        if (total_review.length !== 0) {
            res.json({
                'status': 'ok',
                'data': reviews,
                'total_review': total_review.length,
            })
        }else{
            res.json({
                'status': 'ok',
                'data': reviews,
                'total_review': 0,
            })
        }
    } else {
        res.json(view('reviews empty'))
    }
})

router.get('/reviewed/:mount_id/:user_id', async (req, res, next) => {
    const reviews = await Review.findAll({
        include: [ Models.users ],
        limit:1,
        where: { 
            [Op.and]: [
                {mount_id: req.params.mount_id},
                {user_id: req.params.user_id}
            ]
        },
        order: [
            ['id', 'DESC']
        ]
    })

    if (reviews.length !== 0) {
        res.json(view(reviews))
    } else {
        res.json(view('reviews empty'))
    }
})

router.get('/calculate_review/:id', async (req, res, next) => {
    const reviews = await Review.findAll({
        where: { mount_id: req.params.id }
    })

    var setToArrayStarReview = []

    reviews.forEach(item => { 
        setToArrayStarReview.push(item.rate)
    });

    // kumpulan data rank dalam bentuk array
    // examp. [1,2,1,3,4,5]
    var array_elements = setToArrayStarReview;

    // urutkan nilai dalam array
    // examp. [1,1,2,3,4,5]
    array_elements.sort();

    var current = null;
    var cnt = 0;
    var total = 0;
    var total2 = [];
    var totalDiv = [];

    var total1S = [];
    var total2S = [];
    var total3S = [];
    var total4S = [];
    var total5S = [];
    var cek = [];

    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                total = current*cnt;
                total2.push(total)
                totalDiv.push(cnt)

                if(current >= 1 && current <= 1.9){total1S.push(cnt)}
                if(current >= 2 && current <= 2.9){total2S.push(cnt)}
                if(current >= 3 && current <= 3.9){total3S.push(cnt)}
                if(current >= 4 && current <= 4.9){total4S.push(cnt)}
                if(current >= 5 && current <= 6){total5S.push(cnt)}
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }

    if (cnt > 0) {
        total2.push(current*cnt);
        totalDiv.push(cnt)

        if(current >= 1 && current <= 1.9){total1S.push(cnt)}
        if(current >= 2 && current <= 2.9){total2S.push(cnt)}
        if(current >= 3 && current <= 3.9){total3S.push(cnt)}
        if(current >= 4 && current <= 4.9){total4S.push(cnt)}
        if(current >= 5 && current <= 6){total5S.push(cnt)}
    }

    var totalFirst =  0;
    for(var i=0;i<total2.length;i++){                  
        if(isNaN(total2[i])){continue;}
        totalFirst += Number(total2[i]);
    }

    var totalDiff =  0;
    for(var i=0;i<totalDiv.length;i++){
        if(isNaN(totalDiv[i])){continue;}
        totalDiff += Number(totalDiv[i]);
    }

    var calc = totalFirst / totalDiff

    var roundedString = calc.toFixed(1);
    var rounded = Number(roundedString);

    // Calculate total review per star
    var total1Star =  0;
    for(var i=0;i<total1S.length;i++){
        if(isNaN(total1S[i])){continue;}
            total1Star += Number(total1S[i]);
        }

        var total2Star =  0;
        for(var i=0;i<total2S.length;i++){
            if(isNaN(total2S[i])){continue;}
            total2Star += Number(total2S[i]);
        }

        var total3Star =  0;
        for(var i=0;i<total3S.length;i++){
            if(isNaN(total3S[i])){continue;}
            total3Star += Number(total3S[i]);
        }

        var total4Star =  0;
        for(var i=0;i<total4S.length;i++){
            if(isNaN(total4S[i])){continue;}
            total4Star += Number(total4S[i]);
        }

        var total5Star =  0;
        for(var i=0;i<total5S.length;i++){
            if(isNaN(total5S[i])){continue;}
            total5Star += Number(total5S[i]);
        }

        if (reviews.length !== 0) {
            res.status(201).json({
                'status': 'ok','totalStar': rounded,'oneStar':total1Star,'twoStar':total2Star,'threeStar':total3Star,'fourStar':total4Star,'fiveStar':total5Star
            })
        } else {
            res.status(201).json({
                'status': 'ok','totalStar': 0,'oneStar':0,'twoStar':0,'threeStar':0,'fourStar':0,'fiveStar':0
            })
        }
    }
)

router.post('/', async (req, res, next) => {
    try {
        const {mount_id,user_id,rate,desc} = req.body;
        const reviews = await Review.create({mount_id,user_id,rate,desc});
        if (reviews) {
            res.json(view(reviews))
        }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const getId = req.params.id;
        const {mount_id,user_id,rate,desc} = req.body;
        const reviews = await Review.update({
            mount_id,user_id,rate,desc
        }, {
            where: {
                id: mountId
            }
        });
        if (reviews) {
            res.json(view(reviews))
        }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
})

router.delete('/:id', async function (req, res, next) {
    try {
        const getId = req.params.id;
        const reviews = await Review.destroy({ where: {
            id: getId
        }})
    if (reviews) {
        res.json(view(reviews))
    }
    } catch (err) {
        res.json(view(err.errors[0].message))
    }
});

module.exports = router