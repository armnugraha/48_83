'use strict'

const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
    {
      name: 'Super User',
      username: 'super_user',
      email: 'superuser@grosir.com',
      password: bcrypt.hashSync('password321', bcrypt.genSaltSync(10)),
      phone:('0' + 87822516625).slice(-12),
      role_id: 1,
      company_id:1,
      is_active:true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Admin',
      username: 'admin',
      email: 'admin@grosir.com',
      password: bcrypt.hashSync('password123', bcrypt.genSaltSync(10)),
      phone:('0' + 87822516625).slice(-12),
      role_id: 2,
      company_id:1,
      is_active:true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Arman',
      username: 'arman',
      email: 'arman@gmail.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
      phone:('0' + 87822516625).slice(-12),
      role_id: 3,
      company_id:-1,
      is_active:true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Euis',
      username: 'euis',
      email: 'euis@grosir.com',
      password: bcrypt.hashSync('password123', bcrypt.genSaltSync(10)),
      phone:('0' + 87822516625).slice(-12),
      role_id: 3,
      company_id:-1,
      is_active:true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}