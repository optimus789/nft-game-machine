const router = require('express').Router();
const axios = require('axios');
const { ethers, Wallet, providers } = require('ethers');
const { connect } = require('@textile/tableland');
const fetch = require('node-fetch');
const { apolloClient, apolloClient2 } = require('./apollo-client');
const { gql } = require('@apollo/client/core')

const { LENS_HUB_ABI } = require('./contractAbi')
globalThis.fetch = fetch;
const contract_address = '0xd7B3481De00995046C7850bCe9a5196B7605c367';
const contractAbi = LENS_HUB_ABI;
// Since we don't have Metamask, you need to supply a private key directly
let privKey = process.env.PRIV_KEY;
const wallet = new Wallet(privKey);
const provider = new providers.AlchemyProvider(
    'maticmum',
    process.env.ALCHEMY_KEY
);
const signer = wallet.connect(provider);

router.route('/getNfts/:cntaddr/:owneraddr').get(async (req, res) => {
    try {
        // this is showing you how you use it with react for example
        // if your using node or something else you can import using
        // @apollo/client/core!

        const GET_USERS_NFTS = `
          query($request: NFTsRequest!) {
            nfts(request: $request) {
              items {
                contractName
                contractAddress
                symbol
                tokenId
                owners {
                  amount
                  address
                }
                name
                description
                contentURI
                originalContent {
                  uri
                  metaType
                }
                chainId
                collectionName
                ercType
              }
            pageInfo {
                prev
                next
                totalCount
            }
          }
        }
        `

        const getUsersNfts = (ownerAddress, contractAddress, chainIds) => {
            return apolloClient2.query({
                query: gql(GET_USERS_NFTS),
                variables: {
                    request: {
                        ownerAddress,
                        contractAddress,
                        chainIds,
                        limit: 10
                    }
                },
                fetchPolicy: "no-cache" 
            })
        }
        const nfts = await getUsersNfts(req.params.owneraddr, req.params.cntaddr, [80001])
        res.send(nfts)
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
});

router.route('/getchallenge').get(async (req, res) => {
    try {

        const GET_CHALLENGE = `
            query($request: ChallengeRequest!) {
            challenge(request: $request) { text }
            }
            `

        const generateChallenge = async (address) => {
            return apolloClient2.query({
                query: gql(GET_CHALLENGE),
                variables: {
                    request: {
                        address,
                    },
                },
            })
        }
        console.log(await generateChallenge(wallet.address),wallet.address)
        res.send('Success');
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
});

module.exports = router;
