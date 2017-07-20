'use strict';

module.exports = {
    up: function (queryInterface, Sequelize, done) {

        queryInterface.createTable('organisations', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(function () {
            queryInterface.createTable('relations', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                organisation: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                parent: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            });
        }).then(function () {
            done();
        });
    },

    down: function (queryInterface, Sequelize, done) {
        queryInterface.dropTable('organisations').then(function () {
            queryInterface.dropTable('relations');
        }).then(function () {
            done();
        });
    }
}