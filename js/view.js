const view = {};

view.setActiveScreen = (screenName, fromCreate = false) => {
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

         if (!fromCreate) {
            // get almost conversations of current user from firestore 
            model.getConversations();
            model.listenConversationChange();
         } else {
            view.showCurrentConversation();
            view.showListConversation();
         }
         // action to create new conversation page
         let toCreateConversation = document.getElementById("createConversation");
         toCreateConversation.addEventListener("click", () => {
            view.setActiveScreen("newConversationPage");
         });

         // add user to conversation action
         const addUserForm = document.getElementById("add-user-form");
         addUserForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let newUserMail = addUserForm.friendEmail.value;
            if (newUserMail === '')
               view.setErrorMessage('friendEmail-error', 'Please fill in field.');
            else if (!validateEmail(newUserMail))
               view.setErrorMessage('friendEmail-error', 'Invalid email.');
            else {
               view.setErrorMessage('friendEmail-error', '');
               model.addNewUserToConversation(newUserMail);
               addUserForm.friendEmail.value = '';
            }
         });
         document.querySelector("#send-message-form input").addEventListener("click", () => {
            view.hideNotification(model.currentConversation.id);
         });

         // responsive
         let mediaQuery = window.matchMedia('screen and (max-width: 768px)');
         if (mediaQuery.matches) {
            document.querySelector("#createConversation").innerHTML = `<i class="fa fa-plus-square" aria-hidden="true"></i>`;
         }

         break;

      case 'newConversationPage':
         document.getElementById("main").innerHTML = components.newConversationPage;
         let cancelCreation = document.getElementById("cancelCreation");
         cancelCreation.addEventListener("click", () => {
            view.setActiveScreen("chatPage", true);
         });
         const createConversationForm = document.getElementById("new-conversation-form");
         createConversationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let dataNewConversation = {
               title: createConversationForm.newConversationTitle.value.trim(),
               receiver: createConversationForm.toEmail.value.trim()
            };
            controller.createConversation(dataNewConversation);
         });
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
         <div class="owner"><b>${message.owner}</b></div>
         <div class="message-content">${message.content}</div>
      `;
   }
   document.querySelector('.list-messages').appendChild(messageWrapper);
}
view.showCurrentConversation = () => {
   document.querySelector('.list-messages').innerHTML = '';
   document.querySelector('.list-users').innerHTML = '';
   document.getElementById("conversation-title").innerHTML = model.currentConversation.title;

   // add the message to the conversation and scroll to end
   model.currentConversation.messages.map((msg) => view.addMessage(msg));
   view.scrollToEnd();

   // show the lists of users on conversation
   model.currentConversation.users.map((user) => view.addUserToConversation(user));
}
view.addConversation = (conversation) => {
   const conversationWrapper = document.createElement("div");
   conversationWrapper.classList.add('conversation');
   conversationWrapper.id = conversation.id;
   if (conversation.id === model.currentConversation.id) {
      conversationWrapper.classList.add('current');
   }
   conversationWrapper.innerHTML = `
      <div class="left-title-chat">${conversation.title}</div>
      <div class="number-users"><small>Users: ${conversation.users.length}</small></div>
      <div class="notification"></div>`;

   let mediaQuery = window.matchMedia('screen and (max-width: 768px)');
   if (mediaQuery.matches) {
      conversationWrapper.firstElementChild.innerHTML = conversation.title.charAt(0).toUpperCase();
   }
   mediaQuery.addListener(matches => {
      if (mediaQuery.matches) {
         conversationWrapper.firstElementChild.innerHTML = conversation.title.charAt(0).toUpperCase();
         document.querySelector("#createConversation").innerHTML = `<i class="fa fa-plus-square" aria-hidden="true"></i>`;
      } else {
         conversationWrapper.firstElementChild.innerHTML = conversation.title;
         document.querySelector("#createConversation").innerHTML = '+ New Chat';
      }
   })

   document.querySelector('.list-conversations').appendChild(conversationWrapper);
   conversationWrapper.addEventListener('click', () => {
      // delete current class
      let current = document.querySelector('.current');
      current.classList.remove('current');
      // add current class to which clicked
      conversationWrapper.classList.add('current');
      // show current conversation on chat screen
      for (let item of model.conversations) {
         if (item.id === conversation.id) {
            model.currentConversation = { ...item };
            view.showCurrentConversation();
         }
      }
      view.hideNotification(conversation.id);
   });
}
view.showListConversation = () => {
   document.querySelector('.list-conversations').innerHTML = '';
   model.conversations.map((item) => view.addConversation(item));
}
view.scrollToEnd = () => {
   const elm = document.querySelector('.list-messages');
   elm.scrollTop = elm.scrollHeight;
}
view.addUserToConversation = (user) => {
   let userElement = document.createElement("div");
   userElement.classList.add("user");
   userElement.innerText = user;
   document.querySelector('.list-users').appendChild(userElement);
}
view.showNotification = (id) => {
   let conversationElement = document.getElementById(id);
   // conversationElement.lastElementChild.style = "display: block";
   conversationElement.querySelector('.notification').style = "display: block";
}
view.hideNotification = (id) => {
   const conversationElement = document.getElementById(id);
   conversationElement.querySelector(".notification").style = "display: none";
}