'use strict';

module.exports = function (sequelize, Sequelize) {
    const Organisation = sequelize.define('organisations', {
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
    });

    return Organisation;
}