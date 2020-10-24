const model = {}

model.currentUser = {};             // user is logged in
model.conversations = [];           // currentUser's list of conversation
model.currentConversation = {};     // to show the last conversation which currentUser is on 

model.register = async ({ firstName, lastName, email, password }) => {
   try {
      // call method to register
      let setReg = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // update profile to the acc on firebase
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
   } catch (err) {
      console.log(err);
      alert(err.message);
   }
}

model.addMessageToFire = async (message) => {
   const dataToUpdate = {
      messages: firebase.firestore.FieldValue.arrayUnion(message),
   };
   // // get document id
   // const responses = await firebase.firestore()
   //    .collection('conversations').where('users', 'not-in', ['1stgoddeath@gmail.com', 'hyperaktiv99@gmail.com'])
   //    .get();
   // const users = getDataFromDocs(responses.docs);
   let docID = model.currentConversation.id;

   firebase.firestore().collection('conversations').doc(docID).update(dataToUpdate);
}

model.getConversations = async () => {
   const responses = await firebase.firestore()
      .collection('conversations').where('users', 'array-contains', model.currentUser.email).get();
   model.conversations = getDataFromDocs(responses.docs);
   if (model.conversations.length > 0) {
      model.currentConversation = model.conversations[0];
      // show the current conversation
      view.showCurrentConversation();

      // show the list of conversations
      view.showListConversation();

   }
}

model.listenConversationChange = () => {
   let isFirstRun = true;
   firebase.firestore().collection('conversations')
      .where('users', 'array-contains', model.currentUser.email)
      .onSnapshot((snapshot) => {
         if (isFirstRun) {
            isFirstRun = false;
            return;
         }
         const docChanges = snapshot.docChanges();
         docChanges.map((docChange) => {
            if (docChange.type === 'modified') {
               let dataChange = getDataFromDoc(docChange.doc);
               for (let i = 0; i < model.conversations.length; i++) {
                  if (model.conversations[i].id === dataChange.id) {
                     model.conversations[i] = dataChange;
                  }
               }
               if (dataChange.id === model.currentConversation.id) {
                  model.currentConversation = dataChange;
                  // view.showCurrentConversation();
                  view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length - 1]);
                  view.scrollToEnd();
               }
            }
         })
      });
}