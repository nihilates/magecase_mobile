const priv = require('../private.js'); //location of server address
//Configuration data used throughout the app

module.exports = {
  path: priv.url+':'+priv.port,
  api: {
    user: {
      login: '/api/users/login',
      signup: '/api/users/signup',
      test: '/api/auth/users/getall'
    }
  }
}