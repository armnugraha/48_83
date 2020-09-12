'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('progress_statuses', [{
            name: 'Waiting',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: 'New',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Onprogress',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Done',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Finish',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Cancelled',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('progress_statuses', null, {})
    }
};
