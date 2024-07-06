const path = require('path');
const express = require('express');
const getRecords = require('./services/db_services/getRecords');

const createRoutes = (app) => {

    app.use(express.static(path.join(__dirname, '../../client/build')));

    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });

    app.get('/api/projects', async (request, response) => {
        const records = await getRecords('projects');
        response.json(records);
    });
    
}

module.exports = createRoutes;