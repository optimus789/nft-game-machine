const { apolloClient } = require('./apollo-client');
const { gql } = require('@apollo/client/core')

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`

export const generateChallenge = (address) => {
    return apolloClient.query({
        query: gql(GET_CHALLENGE),
        variables: {
            request: {
                address,
            },
        },
    })
}