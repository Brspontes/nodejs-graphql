const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  #Pontos de entrada
  type Query{
    ola: String
    horaAtual: Date
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
  }
`

const resolvers = { 
  Produto: {
    precoComDesconto(produto) {
      if(produto.desconto) {
        return produto.preco * (1 - produto.desconto)
      } else {
        return produto.preco
      }
    }
  },
  Usuario: {
    salario(usuario) {
      return usuario.salario_real
    }
  },
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
        salario_real: 1234.56,
        vip: true
      }
    },
    produtoEmDestaque() {
      return {
        nome: 'Notebook Gamer',
        preco: 4890.89,
        desconto: 0.15
      }
    },
    numerosMegaSena() {
      const crescente =  (a, b) => a - b
      return Array(6).fill(0).map(n => parseInt(Math.random() * 60 + 1)).sort(crescente)
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
