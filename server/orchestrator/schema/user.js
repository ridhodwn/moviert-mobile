const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../config/redis');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }

    type DeleteMessage {
        message: String
    }

    type Query {
        findUsers: [User]
        findUserById(id: ID): User
    }

    input newUser {
        username: String
        email: String!
        password: String!
        role: String
        phoneNumber: String
        address: String
    }

    type Mutation {
        addUser(newUser: newUser): User
        deleteUser(id: ID): DeleteMessage
    }
`;

const resolvers = {
    Query: {
        findUsers: async () => {
            try {
                const users = await redis.get('app:users');
                if(users) {
                    let data = JSON.parse(users);
                    return (data);
                } else {
                    const { data } = await axios.get('http://localhost:4001/users');
                    await redis.set('app:users', JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                throw error;
            }
        },
        findUserById: async (_, args) => {
            try {
                const { data } = await axios.get(`http://localhost:4001/users/${args.id}`);
                return data;
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                const { data } = await axios.post('http://localhost:4001/users', 
                    args.newUser
                );
                await redis.del('app:users');
                return data;
            } catch (error) {
                throw error;
            }
        },
        deleteUser: async (_, args) => {
            try {
                const { data } = await axios.delete(`http://localhost:4001/users/${args.id}`);
                await redis.del('app:users');
                return data;
            } catch (error) {
                throw error;
            }
        }
    }
};

module.exports = {
    userTypeDefs: typeDefs,
    userResolvers: resolvers
};