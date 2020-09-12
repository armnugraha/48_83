'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('unit_statuses', [{
            name: 'All',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: 'Box',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Dozen',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Unit',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('unit_statuses', null, {})
    }
};
