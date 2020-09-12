'use strict';
module.exports = (sequelize, DataTypes) => {
  const progress_statuses = sequelize.define('progress_statuses', {
    name: DataTypes.STRING
  }, {});
  progress_statuses.associate = function(models) {
    // associations can be defined here
  };
  return progress_statuses;
};