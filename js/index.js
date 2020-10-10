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

   firebase.auth().onAuthStateChanged(function (user) {

      console.log(user)

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

