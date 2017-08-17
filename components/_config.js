const priv = require('../private.js'); //location of server address
//Configuration data used throughout the app

module.exports = {
  path: priv.url+':'+priv.port,
  api: {
    user: {
      login: '/api/users/login',
      signup: '/api/users/signup',
      items: '/api/auth/items',
      test: '/api/auth/users/getall'
    },
    item: {
      all: '/api/auth/items',
      type: '/api/items/type',
      subType: '/api/items/subtype'
    }
  }
}