'use strict';
module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define('companies', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    day: { 
        type: DataTypes.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('day'));
        }, 
        set: function(val) {
            return this.setDataValue('day', JSON.stringify(val));
        }
    },
    shift_in: DataTypes.TIME,
    shift_out: DataTypes.TIME,
    is_break: DataTypes.BOOLEAN,
    is_close: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN
  }, {});
  companies.associate = function(models) {
    // associations can be defined here
  };
  return companies;
};