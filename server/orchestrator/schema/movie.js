const { gql } = require('apollo-server');
const axios = require('axios');
const redis = require('../config/redis');

const typeDefs = gql`
    type Cast {
        id: ID
        name: String
        profilePict: String
    }

    type Genre {
        id: ID
        name: String
    }

    type User {
        id: ID
        username: String
        email: String
        role: String
    }

    type Movie {
        id: ID
        title: String
        slug: String
        synopsis: String
        trailerUrl: String
        imgUrl: String
        rating: Int
        genreId: Int
        UserMongoId: String
        Genre: Genre
        Casts: [Cast]
        User: User
    }

    type DeleteMessage {
        message: String
    }

    type Query {
        findMovies: [Movie]
        findMovieById(id: ID): Movie
    }

    input newCast {
        name: String!
        profilePict: String
    }

    input newMovie {
        title: String!
        synopsis: String!
        trailerUrl: String
        imgUrl: String
        rating: Int!
        genreId: Int
        UserMongoId: String
        Casts: [newCast]
    }

    type Mutation {
        addMovie(newMovie: newMovie): Movie
        editMovie(editMovie: newMovie, id: ID): Movie
        deleteMovie(id: ID): DeleteMessage
    }
`;

const resolvers = {
    Query: {
        findMovies: async () => {
            try {
                const movies = await redis.get('app:movies');
                if(movies) {
                    let data = JSON.parse(movies);
                    return (data);
                } else {
                    const { data } = await axios.get('http://localhost:4002/movies');
                    await redis.set('app:movies', JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                throw error;
            }
        },
        findMovieById: async (_, args) => {
            try {
                const { data } = await axios.get(`http://localhost:4002/movies/${args.id}`);
                const { data: user } = await axios.get(`http://localhost:4001/users/${data.UserMongoId}`);
                data.User = user
                return data;
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        addMovie: async (_, args) => {
            try {
                const { data } = await axios.post('http://localhost:4002/movies', 
                    args.newMovie
                );
                await redis.del('app:movies');
                return data;
            } catch (error) {
                throw error;
            }
        },
        editMovie: async (_, args) => {
            try {
                const { data } = await axios.put(`http://localhost:4002/movies/${args.id}`, 
                    args.editMovie
                );
                await redis.del('app:movies');
                return data;
            } catch (error) {
                throw error;
            }
        },
        deleteMovie: async (_, args) => {
            try {
                const { data } = await axios.delete(`http://localhost:4002/movies/${args.id}`);
                await redis.del('app:movies');
                return data;
            } catch (error) {
                throw error;
            }
        }
    }
};

module.exports = {
    movieTypeDefs: typeDefs,
    movieResolvers: resolvers
};