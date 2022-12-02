import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://48cd-180-252-172-55.ap.ngrok.io',
    cache: new InMemoryCache()
});

export default client;