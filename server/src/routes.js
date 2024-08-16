const path = require('path');
const express = require('express');
const getRecords = require('./services/db_services/getRecords');
const authenticateToken = require('./middleware/authenticateToken');
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

    app.post('/api/send-email', authenticateToken, async (request, response) => {
        const mailOptions = {
            from: request.body.email,
            to: 'piotr.dominik.sobol@gmail.com',
            subject: request.body.topic,
            text: request.body.message
        };
        sendMail(mailOptions);
        response.json({ message: 'Email sent' });
    });
    
}

module.exports = createRoutes;