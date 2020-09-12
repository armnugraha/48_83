'use strict'
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        role_id: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isEmail:true
            },
            unique: {
                args: true,
                msg: 'Username sudah digunakan!'
            }
        },
        email:  {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail:true
            },
            unique: {
                args: true,
                msg: 'Email sudah digunakan!'
            }
        },
        password:  {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8,Infinity]
            },
        },
        phone: DataTypes.INTEGER,
        is_active: DataTypes.BOOLEAN,
        last_login: DataTypes.DATE
    }, {})
    User.associate = function (models) {
        User.belongsTo(models.roles, {
            foreignKey: 'role_id'
        })
    }
    return User
}
