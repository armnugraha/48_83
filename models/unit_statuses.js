'use strict';
module.exports = (sequelize, DataTypes) => {
  const unit_statuses = sequelize.define('unit_statuses', {
    name: DataTypes.STRING
  }, {});
  unit_statuses.associate = function(models) {
    // associations can be defined here
  };
  return unit_statuses;
};