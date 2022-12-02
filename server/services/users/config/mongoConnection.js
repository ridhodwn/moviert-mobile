const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let dbConnection;

async function connectDB() {
    try {
        const db = client.db('User');
        dbConnection = db;
    } catch (error) {
        await client.close();
        console.log(error);
        throw error;
    };
};

function getDB() {
    return dbConnection;
}

module.exports = { connectDB, getDB };