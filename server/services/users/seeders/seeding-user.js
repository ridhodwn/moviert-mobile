const { MongoClient } = require('mongodb');
const docs = require('./user.json');
const { hashPassword } = require('../helpers/bcrypt');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run(req, res) {
    try {
        await client.connect();
        const database = client.db('User');
        const users = database.collection('users');
        const option = {ordered: true};
        let { username, email, password, role, phoneNumber, address } = docs;
        password = hashPassword(password);
        let result = await users.insertOne({username, email, password, role, phoneNumber, address}, option);
        console.log(result);
    } finally {
        await client.close();
    }
};

run().catch(console.dir);