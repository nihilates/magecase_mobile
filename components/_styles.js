import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: 190,
  },
  textBtn: {
    marginBottom: 5,
    flexDirection: 'row',
  }
});

module.exports = styles;