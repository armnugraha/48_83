'use strict';
module.exports = (sequelize, DataTypes) => {
  const settings = sequelize.define('settings', {
    name: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  settings.associate = function(models) {
    // associations can be defined here
  };
  return settings;
};