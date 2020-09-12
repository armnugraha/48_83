'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [{
            name: 'Makanan',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: 'Minuman',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Snack',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {})
    }
};
