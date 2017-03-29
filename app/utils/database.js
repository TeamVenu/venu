import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB_dwG4qtan4dhvvpbjKG9rzkEbVPYklEs',
  authDomain: 'venu-754b2.firebaseapp.com',
  databaseURL: 'https://venu-754b2.firebaseio.com',
  storageBucket: 'venu-754b2.appspot.com',
  messagingSenderId: '131036382275',
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
