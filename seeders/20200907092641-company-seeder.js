'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('companies', [{
            name: 'Toko 48',
            address: 'Jl. Cibiru',
            day: "[\"Senin\",\"Selasa\",\"Rabu\",\"Kamis\",\"Jumat\",\"Sabtu\",\"Minggu\"]",
            shift_in: "08:00:00",
            shift_out: "19:00:00",
            is_active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('companies', null, {})
    }
};
