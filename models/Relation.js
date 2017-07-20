'use strict';

module.exports = function (sequelize, Sequelize) {
    const Relation = sequelize.define('relations', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        organisation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        parent: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Relation;
}