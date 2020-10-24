window.onload = () => {
   // Your web app's Firebase configuration
   var firebaseConfig = {
      apiKey: "AIzaSyDPFM4Lo2QLX2QB1dceTbwJfaZGSyNAesU",
      authDomain: "mindx-chat-app.firebaseapp.com",
      databaseURL: "https://mindx-chat-app.firebaseio.com",
      projectId: "mindx-chat-app",
      storageBucket: "mindx-chat-app.appspot.com",
      messagingSenderId: "159064763496",
      appId: "1:159064763496:web:657572c725d8fe7ff25fdd"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   // set the change of the user and save to firebase
   firebase.auth().onAuthStateChanged(function (user) {
      // console.log(user)
      if (user) {
         if (user.emailVerified) {
            model.currentUser = {
               displayName: user.displayName,
               email: user.email
            };
            view.setActiveScreen('chatPage');
         } else {
            view.setActiveScreen('loginPage');
            alert("Go to verify your email to login.");
         }
      } else {
         view.setActiveScreen("registerPage");
      }
   });

}

firestoreQueries = async () => {
   // const responses = await firebase.firestore()
   //    .collection('conversations').where('users', 'array-contains', '1stgoddeath@gmail.com')
   //    .get();
   // const users = getDataFromDocs(responses.docs);
   // console.log(users[0]);

   // get one document from firestore
   // const response = await firebase.firestore().collection('users').doc('GxNEAut4c202vWIdcFXd').get();
   // const user = getDataFromDoc(response);
   // console.log(user)

   // // get many document
   // const responses = await firebase.firestore()
   //    .collection('users').where('phone', 'array-contains', '0123123')
   //    .get();
   // const users = getDataFromDocs(responses.docs);
   // console.log(users);

   // add new document
   // const dataToAdd = {
   //    name: 'Tran Nguyen A',
   //    age: 22
   // }
   // let a = await firebase.firestore().collection('users').add(dataToAdd)
   // console.log(a);
   // // update document
   // const messageSend = {
   //    owner: 'hyperaktiv99@gmail.com',
   //    content: 'ok, bro. What\'s up?',
   //    createdAt: new Date().toISOString()
   // };
   // const dataToUpdate = {
   //    messages: firebase.firestore.FieldValue.arrayUnion(messageSend),
   // }
   // const responses = await firebase.firestore()
   //    .collection('conversations').where('users', 'not-in', ['1stgoddeath@gmail.com', 'hyperaktiv99@gmail.com'])
   //    .get();
   // const users = getDataFromDocs(responses.docs);

   // firebase.firestore().collection('conversations').doc(users[0].id).update(dataToUpdate);

   // // delete document
   // const docID = 'Kz6W99jSXnaHswq3PDKW';
   // firebase.firestore().collection('users').doc(docID).delete()
}

getDocumentID = async () => {
   const responses = await firebase.firestore()
      .collection('conversations').where('users', 'not-in', ['1stgoddeath@gmail.com', 'hyperaktiv99@gmail.com'])
      .get();
   const users = getDataFromDocs(responses.docs);
   console.log(users[0]);
}
// set a format for user from firebase
getDataFromDoc = (res) => {
   const data = res.data();
   data.id = res.id;
   return data;
}
getDataFromDocs = (res) => {
   return res.map(getDataFromDoc);
}
