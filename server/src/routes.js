import path from 'path';

const createRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
}

module.exports = createRoutes;