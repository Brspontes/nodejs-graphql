const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

  scalar Date

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    Idade: Int
    Salario: Float
    vip: Boolean
  }

  #Pontos de entrada
  type Query{
    ola: String
    horaAtual: Date
    usuarioLogado: Usuario
  }
`

const resolvers = { 
  Query: {
    ola () {
      return 'Qualquer retorno'
    },
    horaAtual () {
      return `${new Date()}`
    },
    usuarioLogado () {
      return {
        id: 1,
        nome: 'Ana',
        email: 'ana@web.com',
        idade: 23,
        salario: 1234.56,
        vip: true
      }
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
