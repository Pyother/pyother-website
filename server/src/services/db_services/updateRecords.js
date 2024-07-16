// * Imports:
const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// * Global variables:
const mongoUri = process.env.MONGODB_URI;
const dbname = process.env.DB_NAME;
const client = new MongoClient(mongoUri);

const updateRecords = async (collectionName, newRecords) => {
    try {
        await client.connect();
        const db = client.db(dbname);
        const collection = db.collection(collectionName);

        for (const newRecord of newRecords) {
            const filter = { _id: newRecord._id };
            const updateDoc = {
                $set: newRecord,
            };
            const result = await collection.updateOne(filter, updateDoc);
            console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
        }
    } catch (error) {
        console.error('Error updating records:', error);
    } finally {
        await client.close();
    }
};

module.exports = updateRecords;