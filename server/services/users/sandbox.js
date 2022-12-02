const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'myNewDatabase';

async function test() {
    try {
        const database = client.db(dbName);
        const movie = database.collection('movies');
        const data = await movie.find().toArray();

        console.log(data);
    } catch (error) {
        await client.close();
        console.log(error);
    }
};

test();
