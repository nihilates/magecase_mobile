import axios from 'axios'; //axios for AJAX calls
import { path, api } from '../_config.js';
import { replaceFile } from '../_utility/storageUtils.js';

module.exports = {

  buildAccount: async (account, callback) => {
    let accountData = {};

    await axios.get(path+'/api/users/fulldetails', {
      params: account
    })
    .then(resp => {accountData = resp.data[0]} ) //The only index that matters is the first one
    .then(async () => { //add default currencies
      await axios.get(path+'/api/default/currencies')
        .then(resp => {
          accountData.currency_systems = resp.data.concat(accountData.currency_systems);
        })
        .catch(err => console.error(err) );
    })
    .then(async () => { //add default items
      await axios.get(path+'/api/default/items')
        .then(resp => {
          accountData.items = resp.data.concat(accountData.items);
        })
        .catch(err => console.error(err) );
    })
    .then(async () => { //add default item types
      await axios.get(path+'/api/default/types')
        .then(resp => {
          accountData.item_types = resp.data;
        })
        .catch(err => console.error(err) );
    })
    .then(async () => { //add default shop types
      await axios.get(path+'/api/default/shoptypes')
        .then(resp => {
          accountData.shop_types = resp.data.concat(accountData.shop_types);
        })
        .catch(err => console.error(err) );
    })
    .then(() => { //then replace the File
      if (callback) callback(accountData);
      replaceFile('accountData', accountData);
    })
    .catch(err => console.error(err) );
  },

};