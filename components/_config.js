const priv = require('../private.js'); //location of server address
//Configuration data used throughout the app

module.exports = {
  path: priv.url+':'+priv.port,
  api: {
    user: {
      login: '/api/users/login',
      signup: '/api/users/signup',
    },
    item: {
      all: '/api/auth/items/all',
      types: '/api/items/types',
      subtypes: '/api/items/subtypes',
      oftype: '/api/items/oftype',
      typeset: '/api/items/typeset'
    },
    char: {
      all: '/api/chars',
      create: '/api/chars/create'
    },
    game: {
      all: '/api/games',
      create: '/api/games/create'
    },
    currency: {
      systems: '/api/currencysys'
    },
    inventory: {
      all: '/api/inventory/all',
      update: '/api/inventory/update',
      add: '/api/inventory/add',
      remove: '/api/inventory/remove',
    },
  }
}