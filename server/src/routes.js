const path = require('path');
const express = require('express');

const createRoutes = (app) => {

    app.use(express.static(path.join(__dirname, '../../client/build')));

    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });
}

module.exports = createRoutes;