// * Imports:
const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// * Global variables:
const mongoUri = process.env.MONGODB_URI;
const dbname = process.env.DB_NAME;
const client = new MongoClient(mongoUri);

const getRecords = async (collectionName) => {
    
    try {
        await client.connect();
        const db = client.db(dbname);
        const collection = db.collection(collectionName);
        const records = await collection.find().toArray();
        return records;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

module.exports = getRecords;


    