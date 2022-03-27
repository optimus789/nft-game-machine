// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
const { ApolloClient, InMemoryCache, HttpLink, ApolloLink } = require('@apollo/client/core');

const httpLink = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    // if your using node etc you have to handle your auth different
    const token = 2//localStorage.getItem('auth_token');

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            'x-access-token': token ? `Bearer ${token}` : ''
        }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
const apolloClient2 = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
        },
      },
})

module.exports = {
    apolloClient,
    apolloClient2
}