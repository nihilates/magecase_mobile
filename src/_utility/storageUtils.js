/* Methods for Manipulating AsyncStorage on the Device */
import { AsyncStorage, Alert } from 'react-native'; //required for AsyncStorage token saving functions

const saveFile = async (fileName, data) => { //Enter desired fileName (string) and data to save (object)
  try {
    await AsyncStorage.setItem(fileName, JSON.stringify(data) ); //Stringify the data before storing it
  } catch (error) {
    console.error('AsyncStorage Error:', error.message);
  }
};

const loadFile = async (fileName, callback) => { //Lookup a fileName saved to the device and invokes a callback
  try {
    await AsyncStorage.getItem(fileName)
      .then(file => {
        callback(JSON.parse(file)); //Parse the data from a JSON string back to object format and run callback
      })
  } catch (error) {
    console.error('AsyncStorage Error:', error.message);
  }
};

const replaceFile = async (fileName, newData) => { //Lookup and replace an existing string of data
  try {
    await AsyncStorage.removeItem(fileName) //Delete existing entry
      .then(async () => {
        await AsyncStorage.setItem(fileName, JSON.stringify(newData)); //Set the newData for the file
      })
  } catch (error) {
    console.error('AsyncStorage Error:', error.message);
  }
};

const removeFile = async (fileName, callback, props={}) => { //Remove a saved file from the device, and then execute a callback if one is supplied
  try {
    await AsyncStorage.removeItem(fileName); //Removes file
    if (callback) callback(props); //If callback exists, run it (in this app, it will mostly be a navigation callback)
  } catch (error) {
    console.error('AsyncStorage Error:', error.message);
  }
};

module.exports = {
  saveFile,
  loadFile,
  replaceFile,
  removeFile,
};