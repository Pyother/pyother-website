
const express = require('express');
const createRoutes = require('./routes');
const setupDB = require('./services/db_services/connection');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;

const app = express();
const port = 3000;

createRoutes(app);

setupDB(mongoUri);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

