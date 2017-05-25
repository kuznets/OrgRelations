'use strict';
/**
 * The Organisation API
 *
 * routes:
 *  /api/create/organisations
 */

const db = require('../config/db.js');

exports.create = {};
exports.create.addNewOrganisations = addNewOrganisations;

/**
 * POST /api/create/organisations
 * Return all user orders from db.
 * @method addNewOrganisations
 * @return json {message: 'status information'}
 */
function addNewOrganisations(req, res) {
    console.log('New Organisation added');
    res.status(200).send('OK');
}