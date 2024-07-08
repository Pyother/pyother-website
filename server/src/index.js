// * Imports:
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const createRoutes = require('./routes');
require('dotenv').config();

// * Constants:
const mongoUri = process.env.MONGODB_URI;

const app = express();
const port = 50000;

// * CORS:
app.use(cors());
app.use(express.json());

// * Moongoose:
mongoose.connect(mongoUri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// * Routes:
createRoutes(app);

// * Server start:
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

