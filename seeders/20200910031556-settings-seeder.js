'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('settings', [{
            name: 'update_apk',
            value: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: 'notification',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('settings', null, {})
    }
};
