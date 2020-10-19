const view = {};

view.setActiveScreen = (screenName) => {
   switch (screenName) {
      case 'welcomeScreen':
         document.getElementById("app").innerHTML = components.welcomePage;
         break;

      case 'registerPage':
         document.getElementById("app").innerHTML = components.registerPage;
         let toLogin = document.getElementById("toLogin");
         toLogin.addEventListener("click", () => {
            view.setActiveScreen("loginPage");
         });
         const registerForm = document.getElementById("register-form");
         registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dataRegister = {
               firstName: registerForm.firstName.value,
               lastName: registerForm.lastName.value,
               email: registerForm.email.value,
               password: registerForm.password.value,
               repassword: registerForm.repassword.value
            };
            controller.register(dataRegister);
         });
         break;

      case 'loginPage':
         document.getElementById("app").innerHTML = components.loginPage;
         let toRegister = document.getElementById("toRegister");
         toRegister.addEventListener("click", () => {
            view.setActiveScreen("registerPage");
         });
         const loginForm = document.getElementById("login-form");
         loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dataLogin = {
               email: loginForm.email.value,
               password: loginForm.password.value,
            };
            controller.login(dataLogin);
         });
         break;

      case 'chatPage':
         document.getElementById("app").innerHTML = components.chatPage;
         const sendMessageForm = document.getElementById("send-message-form");
         sendMessageForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const message = sendMessageForm.messageInput.value;
            const messageSend = {
               owner: model.currentUser.email,
               content: message,
               createdAt: new Date().toISOString()
            };
            if (message.trim() !== '') {                 // send message
               // add sent message to firestore
               model.addMessageToFire(messageSend);
            }
            sendMessageForm.messageInput.value = '';
         });

         // get almost conversations of current user from firestore 
         model.getConversations();

         // listen the change of the conversation when an message sent
         model.listenConversationChange();

         break;
   }
}

// show error when the inputs are not be right
view.setErrorMessage = (elementId, message) => {
   document.getElementById(elementId).innerText = message;
}

// add the message to the chat when send or be sent
view.addMessage = (message) => {
   const messageWrapper = document.createElement("div");
   messageWrapper.classList.add('message');
   // if sender is ourself
   if (model.currentUser.email === message.owner) {
      messageWrapper.classList.add('message-mine');
      messageWrapper.innerHTML = `
         <div class="message-content">${message.content}</div>
      `;
   } else { // when sender is other people sent to conversation
      messageWrapper.classList.add('message-other');
      messageWrapper.innerHTML = `
         <div class="message-content">${message.content}</div>
      `;
   }
   document.querySelector('.list-messages').appendChild(messageWrapper);
}

view.showCurrentConversation = () => {
   document.querySelector('.list-messages').innerHTML = '';
   document.getElementById("conversation-title").innerHTML = model.currentConversation.title;
   model.currentConversation.messages.map((msg) => view.addMessage(msg));
}