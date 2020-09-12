'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
  	// id: {
   //      type: DataTypes.INTEGER,
   //      primaryKey: true
   //  },
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    // Role.hasMany(models.user, {
    //     foreignKey: 'role_id'
    // })
  };
  return Role;
};