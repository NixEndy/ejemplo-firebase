import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDo32uWpzRAyYN1rWuP9EiI_QlgqqHWArE",
    authDomain: "paradigmas-react.firebaseapp.com",
    databaseURL: "https://paradigmas-react.firebaseio.com",
    projectId: "paradigmas-react",
    storageBucket: "paradigmas-react.appspot.com",
    messagingSenderId: "177126707831",
    appId: "1:177126707831:web:18125ae566b756b675ec72"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export{firebase};