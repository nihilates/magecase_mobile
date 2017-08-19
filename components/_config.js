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
      all: '/api/auth/items',
      type: '/api/items/type',
      subType: '/api/items/subtype'
    },
    char: {
      all: '/api/chars'
    },
    game: {
      all: '/api/games'
    }
  }
}