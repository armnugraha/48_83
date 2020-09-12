'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_id: {
                type: Sequelize.INTEGER
                // references: { model: 'roles', key: 'id' }
            },
            company_id: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            username: {
                unique: true,
                type: Sequelize.STRING
            },
            email: {
                unique: true,
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            last_login: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users')
    }
}
