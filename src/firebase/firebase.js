import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJvLbtD-bLq1fyDPwJoIlHR4Cexdq3eY0",
    authDomain: "rnfirebase-1ab33.firebaseapp.com",
    databaseURL: "https://rnfirebase-1ab33.firebaseio.com",
    projectId: "rnfirebase-1ab33",
    storageBucket: "rnfirebase-1ab33.appspot.com",
    messagingSenderId: "489393880198",
    appId: "1:489393880198:web:26b5869da370553b886507",
    measurementId: "G-KKGLX7E5GC"
  };

  firebase.initializeApp(firebaseConfig)

  export const db = firebase.firestore()
  export default firebase;