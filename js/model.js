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
// add message when there is a message sent
model.addMessageToFire = async (message) => {
   const dataToUpdate = {
      messages: firebase.firestore.FieldValue.arrayUnion(message),
   };
   let docID = model.currentConversation.id;
   firebase.firestore().collection('conversations').doc(docID).update(dataToUpdate);
}
// get all the conversations of currentUser
model.getConversations = async () => {
   const responses = await firebase.firestore()
      .collection('conversations').where('users', 'array-contains', model.currentUser.email).get();
   model.conversations = getDataFromDocs(responses.docs);
   if (model.conversations.length > 0) {
      model.currentConversation = model.conversations[0];

      view.showCurrentConversation();
      view.showListConversation();
   }
}
// listen when data on firestore change
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
            // when message has been sent
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
            // when create a new conversation
            else if (docChange.type === 'added') {
               let dataChange = getDataFromDoc(docChange.doc);
               model.conversations.push(dataChange);
               view.addConversation(dataChange);
            }

         })
      });
}
// to create a new conversation from currentUser
model.createNewConversation = ({ title, receiver }) => {
   let dataNewConversation = {
      createdAt: new Date().toISOString(),
      messages: [],
      title: title,
      users: [
         model.currentUser.email,
         receiver
      ]
   };
   firebase.firestore().collection('conversations').add(dataNewConversation);
   view.setActiveScreen('chatPage', true);
}

model.addNewUserToConversation = (mail) => {

}