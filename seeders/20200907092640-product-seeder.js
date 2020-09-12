'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('products', [{
            company_id:1,
            category_id:1,
            unit_id:1,
            name: "Mie",
            price: "{\"box\": 200000, \"dozen\":1000, \"unit\":5000}",
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            company_id:1,
            category_id:1,
            unit_id:2,
            name: "ABC",
            price: "{\"box\": 200000}",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            company_id:1,
            category_id:1,
            unit_id:3,
            name: "Susu",
            price: "{\"dozen\":1000}",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            company_id:1,
            category_id:1,
            unit_id:4,
            name:"Sabun",
            price: "{\"unit\":5000}",
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {})
    }
};
