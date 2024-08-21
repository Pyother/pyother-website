const path = require('path');
const express = require('express');
const getRecords = require('./services/db_services/getRecords');
const sendMail = require('./services/mail/mailService');

const createRoutes = (app) => {

    app.use(express.static(path.join(__dirname, '../../client/build')));

    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });

    app.get('/api/projects', async (request, response) => {
        const records = await getRecords('projects');
        response.json(records);
    });

    app.get('/api/services', async (request, response) => {
        const records = await getRecords('services');
        response.json(records);
    });

    app.post('/api/send-email', async (request, response) => {
        console.log(request.body);
        sendMail(request.body);
        response.json({ message: 'Email sent' });
    });
}

module.exports = createRoutes;