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

   
   // view.setActiveScreen("welcomeScreen");
   view.setActiveScreen("registerPage");


}

