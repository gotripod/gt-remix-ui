import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const API_URL = 'https://content.gotripod.com/graphql'

const ac = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

export default ac
