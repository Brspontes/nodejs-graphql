const { ApolloServer, gql } = require('apollo-server')

const usuarios =[{
  id: 1,
  nome: 'João',
  email: 'Joao@Joao.com',
  idade: 29
}, {
  id: 2,
  nome: 'João 2',
  email: 'Joao2@Joao.com',
  idade: 29
}, {
  id: 3,
  nome: 'João 3',
  email: 'Joao3@Joao.com',
  idade: 29
}]

const typeDefs = gql`

  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Usuario {
    id: Int!
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
    usuarios: [Usuario]
    usuario(id: Int!): Usuario
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
    },
    usuarios() {
      return usuarios
    },
    usuario(_, { id }) {
      const selecionados = usuarios.filter(u => u.id === id)
      return selecionados ? selecionados[0] : null
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
