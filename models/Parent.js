'use strict';

module.exports = function (sequelize, Sequelize) {
    const Parent = sequelize.define('parents', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        organisationId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Parent;
}