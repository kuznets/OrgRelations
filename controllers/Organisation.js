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

let parseOrgList = [];
let errMsg = {};

/**
 * POST /api/create/organisations
 * Return report on implementation
 * @method addNewOrganisations
 * @return json {message: 'status information'}
 */
function addNewOrganisations(req, res) {

    validateIncomingData(req.body);
    if (errMsg.vrongData) {
        console.log('Incoming date validation failed: ', errMsg.vrongData);
        res.status(200).send(errMsg.vrongData);
    } else {
        parseRequestAndCreateOrgList(req.body);
        if (parseOrgList.length != 0) {
            console.log(parseOrgList);

            let foundOrgs = new Map();
            let list = parseOrgList.map(item => {
                let foundOrgPromise = foundOrgs.get(item.org_name);
                if (!foundOrgPromise) {
                    foundOrgPromise = createNewOrg(item);
                    foundOrgs.set(item.org_name, foundOrgPromise);
                }
                return foundOrgPromise.then(org => {
                    if(org) {
                        // item.org_id = org.id;
                        if(item.parent_name != null) {
                            createNewParent(item);
                        }
                    }
                })
                    .catch(error => {
                        console.log('Function: \'addNewOrganisations\' error: ', error);
                        res.status(200).send('Creation failed: ', error);
                    });
            });
            res.status(200).send('OK');
        }
    }

    parseOrgList = [];
    errMsg = {};
}

/**
 * Method parse incoming date and create new array with formatted data.
 * Formatted data example: [{org_name: 'aaa', parent_name: 'sss'}]
 * @method parseRequestAndCreateOrgList
 * @param object incoming data
 */
function parseRequestAndCreateOrgList(data, parentName = null) {
    if (data.org_name) {
        parseOrgList.push({
            org_name: data.org_name,
            parent_name: parentName
        });

        if (data.daughters) {
            data.daughters.forEach(item => {
                parseRequestAndCreateOrgList(item, data.org_name);
            });
        }
    } else {
        throw new Error('Incoming data have wrong format, inspect api documentation.');
    }
}

/**
 * Method validate the incoming object with organisations and relations.
 * @method validateIncomingData
 * @param object with org name and parent name
 */
function validateIncomingData(data) {
    if (!data.org_name) {
        errMsg.vrongData = 'Incoming data have wrong format, inspect api documentation.';
    }
    if (data.daughters) {
        data.daughters.forEach(item => {
            validateIncomingData(item);
        });
    }
}

/**
 * Method created organisation
 * Return found or created organisation:
 * if organisation found in db return found data
 * if organisation not found in db create organisation and return result
 * @method createNewOrg
 * @param object with org name and parent name
 * @return organisation data from db
 */
function createNewOrg(data) {
    return db.organisations.findAll({where: {name: data.org_name}})
        .then(found => {
            if (found.length > 0) {
                return found[0];
            }
            if (found.length < 1) {
                return db.organisations.create({name: data.org_name})
                    .then(created => {
                        return created.dataValues;
                    });
            }
        });
}

/**
 * Method created relation
 * Return created relation result
 * @method createNewParent
 * @param object with org name and parent name
 * @return created relation from db
 */
function createNewParent(data) {
    return db.relations.create({organisation: data.org_name, parent: data.parent_name})
        .then(created => {
            return created.dataValues;
    });
}

