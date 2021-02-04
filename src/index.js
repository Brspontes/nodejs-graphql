const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  #Pontos de entrada
  type Query{
    ola: String
  }
`

const resolvers = { 
  Query: {
    ola () {
      return 'Qualquer retorno'
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers  
})

server.listen(3000).then(({ url }) => {
  console.log(`${url}`)
})
