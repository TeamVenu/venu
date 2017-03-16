import firebase from 'firebase';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
