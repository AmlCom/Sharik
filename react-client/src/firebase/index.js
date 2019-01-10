import firebase from 'firebase/app'
import 'firebase/storage'
  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyA2_CdlHg0YoDJP2wUHpOG1eSN_3pxKK-c",
    authDomain: "amlcom.firebaseapp.com",
    databaseURL: "https://amlcom.firebaseio.com",
    projectId: "amlcom",
    storageBucket: "amlcom.appspot.com",
    messagingSenderId: "459618489193"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {storage , firebase as default }

//   <script src="https://www.gstatic.com/firebasejs/5.7.2/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyA2_CdlHg0YoDJP2wUHpOG1eSN_3pxKK-c",
//     authDomain: "amlcom.firebaseapp.com",
//     databaseURL: "https://amlcom.firebaseio.com",
//     projectId: "amlcom",
//     storageBucket: "amlcom.appspot.com",
//     messagingSenderId: "459618489193"
//   };
//   firebase.initializeApp(config);
// </script>
