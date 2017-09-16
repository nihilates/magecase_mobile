/* Functions That Assist Managing Redux States As They Relate to AsyncStorage */

module.exports = {
  /* Method to Merge All States and Save Them to Storage */
  mergeAll: (account, states, callback, param) => { //"states" is an object of all states from the Redux store; keys of this object must be input
    let updated = Object.assign({}, account, states); //join all the states into a single object call "account"
    callback(param, updated); //invoke callback on account; this will likely be an AsyncStorage call
  },

  /* Method to Add a Character to the List of Characters */
  addCharacter: (array, charName, data, currencySys, created, callback) => {
    const characters = array.map(i => {return i}); //create new array so as to avoid mutation in Redux

    if (created.id) {
    //if the response from the Axios request (called "created") has a key of "id",
    //we know the request was successful, so we build our character from the response
      created.currency_system = currencySys; //add the full details of the selected currency system to the character
      created.inventories = []; //add an empty array for the character's inventory

      characters.push(created); //push the properly formatted character into the characters array
    } else { //If the Axios request did not complete, do the following...
      let dt = new Date().toISOString(); //create a reference to the current date/time in ISO format
      let char = { //define a character object
        char_name: charName, //add the provided name
        createdAt: dt, //set its creation date
        currencySystemId: data.currencySystemId, //add the provided currencySystemId
        currency_system: currencySys, //add the full details of the selected currency system to the character object
        id: null, //TODO: A method for effectively assigning an ID to characters created offline is necessary
        inventories: [], //add an empty array for the character's inventory
        updatedAt: dt, //set its updatedAt date
        userId: data.userId, //add the provided userId
      };

      characters.push(char); //push the properly formatted character into the characters array
    }

    //if a callback was provided...
    if (callback) callback(characters); //run the callback on the newly formatted array; this will likely be a Redux action
  },

  /* Method to Add an Entry to an Inventory */
  addInventory: (array, data, count, character, resp, callback) => {
    if (resp) {
      resp.item = data;
      array.push(resp); //push the "resp" into the submitted array
    } else {
      let dt = new Date().toISOString();
      let entry = {
        characterId: character.id,
        count: count,
        createdAt: dt,
        id: data.item_name, //temporary value
        item: data,
        itemId: data.id,
        updatedAt: dt,
      }

      array.push(entry); //push the "entry" into the submitted array
    }

    if (callback) callback(array); //if a callback was supplied, run the callback on the array
  },

  /* Method to Update Data Prior to Storing It */
  updateEntry: (entry, key, newVal, callback) => {
    entry[key] = newVal; //set the key in "entry" to the new value

    if (callback) { //if a callback was supplied...
      callback(entry); //run the callback on the updated entry; this might be a Redux action
    } else { //otherwise...
      return entry; //just return the entry
    }
  },

  /* Method to Remove A Single Entry in an Array of Entries */
  removeFrom: (array, key, value, callback) => {
    let i = array.findIndex(entry => entry[key] === value);

    if (i<0) {
      console.error('Desired Entry Not Found');
    } else {
      array.splice(i,1);

      if (callback) callback(array);
    }
  },

  /* Method to Update A Single Entry in an Array of Entries */
  updateIn: (array, key, value, data, callback) => {
    let i = array.findIndex(entry => entry[key] === value); //search for the index of an entry that matches the key:value pairing

    if (i<0) { //if no such entry is found...
      console.error('Desired Entry Not Found'); //log the an error message; this should only happen if improper data parameters were supplied
    } else { //otherwise...
      let update = Object.assign({}, array[i], data); //merge the new data from the object with the old
      array[i] = update; //set the noted index of the entry to equal the newly updated entry

      if (callback) callback(array); //run the supplied callback on the newly updated array; this will usually be a Redux action
    }
  },
};

/* Test Data - A pain to rewrite... */

// function modRedux(object, key, newValue) {
//   return object[key]
// }

// var inventory = [
//   {
//     characterId:2,
//     count:1,
//     createdAt:"2017-09-11T15:38:06.000Z",
//     id:1,
//     item: {
//       damageType:"piercing",
//       description:null,
//       dice_count:1,
//       dice_type:8,
//       id:26,
//       is_custom:false,
//       itemSubTypeId:3,
//       itemTypeId:1,
//       item_name:"Rapier",
//       properties:"Finesse",
//       rangeHi:0,
//       rangeLo:0,
//       userId:null,
//       value:25,
//       versatility:0,
//       weight:2,
//     },
//     itemId: 26,
//     updatedAt: "2017-09-11T15:38:06.000Z"
//   },
//   {
//     characterId:2,
//     count:2,
//     createdAt:"2017-09-11T15:38:06.000Z",
//     id:2,
//     item: {
//       damageType:"piercing",
//       description:null,
//       dice_count:1,
//       dice_type:4,
//       id:2,
//       is_custom:false,
//       itemSubTypeId:1,
//       itemTypeId:1,
//       item_name:"Dagger",
//       properties:"Finesse, light, thrown",
//       rangeHi:60,
//       rangeLo:20,
//       userId:null,
//       value:2,
//       versatility:0,
//       weight:2,
//     },
//     itemId: 2,
//     updatedAt: "2017-09-11T15:38:06.000Z"
//   },
//   {
//     characterId:2,
//     count:1,
//     createdAt:"2017-09-11T15:38:06.000Z",
//     id:3,
//     item: {
//       damageType:"piercing",
//       description:null,
//       dice_count:1,
//       dice_type:6,
//       id:13,
//       is_custom:false,
//       itemSubTypeId:2,
//       itemTypeId:1,
//       item_name:"Shortbow",
//       properties:"Ammunition, two-handed",
//       rangeHi:320,
//       rangeLo:80,
//       userId:null,
//       value:25,
//       versatility:0,
//       weight:2,
//     },
//     itemId: 13,
//     updatedAt: "2017-09-11T15:38:06.000Z"
//   },
// ]

// var entry = {
//   characterId:2,
//   count:1,
//   createdAt:"2017-09-11T15:38:06.000Z",
//   id:1,
//   item: {
//     damageType:"piercing",
//     description:null,
//     dice_count:1,
//     dice_type:8,
//     id:26,
//     is_custom:false,
//     itemSubTypeId:3,
//     itemTypeId:1,
//     item_name:"Rapier",
//     properties:"Finesse",
//     rangeHi:0,
//     rangeLo:0,
//     userId:null,
//     value:25,
//     versatility:0,
//     weight:2,
//   },
//   itemId: 26,
//   updatedAt: "2017-09-11T15:38:06.000Z"
// }

// var newEntry = {
//   characterId:2,
//   count:15,
//   createdAt:"2017-09-11T15:38:06.000Z",
//   id:1,
//   item: {
//     damageType:"piercing",
//     description:"A right nasty pokey-stick",
//     dice_count:1,
//     dice_type:8,
//     id:26,
//     is_custom:false,
//     itemSubTypeId:3,
//     itemTypeId:1,
//     item_name:"Rapier",
//     properties:"Finesse, sexy",
//     rangeHi:0,
//     rangeLo:0,
//     userId:null,
//     value:25,
//     versatility:0,
//     weight:2,
//   },
//   itemId: 26,
//   updatedAt: "2017-09-11T15:38:06.000Z"
// }