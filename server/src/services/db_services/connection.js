const { MongoClient } = require('mongodb');

// * Global variables:
let client;

const setupDB = async (uri) => {

    // Tworzenie instancji klienta i łączenie z bazą
    client = new MongoClient(uri);
    await client.connect();
    console.log('Database connected ✅');

}

module.exports = setupDB;