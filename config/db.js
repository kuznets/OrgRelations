'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('org_relations', 'pguser', '12345',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        max: 100,
        idleTimeoutMillis: 30000,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.organisations = require('../models/Organisation')(sequelize, Sequelize);
db.relations = require('../models/Relation')(sequelize, Sequelize);

module.exports = db;