'use strict';
var Sequelize = require('sequelize')

var attributes = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    fullname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate : {
            isEmail : true
        }
    },
    phone: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    observation: {
        type: Sequelize.STRING
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
}

var options = {
    freezeTableName: true,
    //custom queries
    scopes : {
        findByEmail : function(param){
            return {
                where : {
                    email :  param
                }
            }
        },
    }
}

module.exports.attributes = attributes
module.exports.options = options