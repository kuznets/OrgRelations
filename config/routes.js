'use strict';
/**
 *@overview routes
 * Application Routing
 * This file initializes the links between route controllers and the express
 * HTTP server.
 */
const organisation = require('../controllers/Organisation')

// expose routes to the server.
exports.configure = function configure(app) {


    // ---------------------------------------------------------
    // API routes
    // ---------------------------------------------------------
    app.post('/api/organisations', organisation.create.addNewOrganisations);

}