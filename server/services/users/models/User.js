const { getDB } = require("../config/mongoConnection");
const { ObjectId } = require('mongodb');

class User {
    static user() {
        const users = getDB().collection('users');
        return users;
    };

    static findAll() {
        return this.user().find().toArray();
    };

    static findByEmail(email) {
        return this.user().findOne({
            email
        });
    };

    static findById(userId) {
        return this.user().findOne({
            _id: ObjectId(userId)
        });
    };

    static create(user) {
        return this.user().insertOne(user);
    };

    static delete(userId) {
        return this.user().deleteOne({
            _id: ObjectId(userId)
        });
    };
};

module.exports = User;