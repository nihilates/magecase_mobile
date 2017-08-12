const priv = require('../private.js'); //location of server address
//Configuration data used throughout the app

module.exports = {
  api: {
    path: priv.url+':'+priv.port+'/api/'
  }
}