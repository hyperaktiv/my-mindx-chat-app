const model = {}

model.currentUser = {};

model.register = async ({ firstName, lastName, email, password }) => {
   try {
      // call method to register
      let setReg = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // update profile
      firebase.auth().currentUser.updateProfile({
         displayName: firstName + ' ' + lastName
      });

      if (setReg.additionalUserInfo.isNewUser) {
         alert("You have just registered an account.\n Go to Login.");
      }

      // send email verify
      firebase.auth().currentUser.sendEmailVerification();

      // switch to login sreen
      view.setActiveScreen('loginPage');


   } catch (err) {
      console.log(err);
      alert(err.message);
   }
}

model.login = async ({ email, password }) => {
   try {
      // verify loggin details
      let getLogin = await firebase.auth().signInWithEmailAndPassword(email, password);

      // if (getLogin.user.emailVerified) {
      //    view.setActiveScreen('welcomeScreen');
      // } else {
      //    alert("Go to verify your email to login.");
      //    view.setActiveScreen('loginPage');
      // }
      // var user = firebase.auth().currentUser;



   } catch (err) {
      console.log(err);
      alert(err.message);
   }
}