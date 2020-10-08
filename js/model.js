const model = {}

model.register = async ({ firstName, lastName, email, password }) => {
   try {
      // call method to register
      let setReg = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // update profile
      firebase.auth().currentUser.updateProfile({
         displayName: firstName + ' ' + lastName
      });

      if(setReg.additionalUserInfo.isNewUser) {
         alert("You have just registered an account.\n Go to Login.");
      }
      
      // send email verify
      firebase.auth().currentUser.sendEmailVerification();

   } catch (err) {
      console.log(err);
      alert(err.message);
   }
}

model.login = async ({ email, password }) => {

   // verify loggin details
   let getLogin = await firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

      alert(error.message);

   });
   if(getLogin) {
      alert("You're logged in.");
   }

   // var user = firebase.auth().currentUser;
   // console.log(user);

}