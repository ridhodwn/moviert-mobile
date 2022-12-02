const { ApolloServer } = require('apollo-server');
const port = process.env.PORT || 4000;
const { movieTypeDefs, movieResolvers } = require('./schema/movie');
const { userTypeDefs, userResolvers } = require('./schema/user');

const server = new ApolloServer({
    typeDefs: [movieTypeDefs, userTypeDefs],
    resolvers: [movieResolvers, userResolvers]
});

server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});