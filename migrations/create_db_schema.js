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
            queryInterface.createTable('parents', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                organisationsId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'organisations',
                        key: 'id'
                    }
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
            queryInterface.dropTable('parents');
        }).then(function () {
            done();
        });
    }
}