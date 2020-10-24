const controller = {}

controller.register = ({ firstName, lastName, email, password, repassword }) => {
   if (firstName === '')
      view.setErrorMessage('firstName-error', 'Please fill in first name.');
   else
      view.setErrorMessage('firstName-error', '');
   if (lastName === '')
      view.setErrorMessage('lastName-error', 'Please fill in last name.');
   else
      view.setErrorMessage('lastName-error', '');
   if (email === '')
      view.setErrorMessage('email-error', 'Please fill in your email.');
   else
      view.setErrorMessage('email-error', '');
   if (password === '')
      view.setErrorMessage('password-error', 'Please fill in password.');
   else
      view.setErrorMessage('password-error', '');
   if (repassword === '')
      view.setErrorMessage('repassword-error', 'Please fill in confirm password.');
   else if (password !== repassword)
      view.setErrorMessage('repassword-error', 'Your password didn\'t match. ');
   else
      view.setErrorMessage('repassword-error', '');

   if (firstName !== ''
      && lastName !== ''
      && email !== ''
      && password !== ''
      && repassword !== ''
      && password === repassword
   ) {
      const dataRegister = { firstName, lastName, email, password, repassword };
      // console.log(dataRegister);
      model.register(dataRegister);
   }

}

controller.login = ({ email, password }) => {
   if (email === '')
      view.setErrorMessage('email-error', 'Please fill in your email.');
   else
      view.setErrorMessage('email-error', '');

   if (password === '')
      view.setErrorMessage('password-error', 'Please fill in password.');
   else
      view.setErrorMessage('password-error', '');

   if (email !== '' && password !== '') {
      const dataLogin = { email, password };
      // console.log(dataLogin);
      model.login(dataLogin);
   }
}

controller.createConversation = ({ title, receiver }) => {
   if (title === '')
      view.setErrorMessage('newTitle-error', 'Please fill in this field.');
   else
      view.setErrorMessage('newTitle-error', '');

   if (receiver === '')
      view.setErrorMessage('toEmail-error', 'Please fill in email receiver.');
   else
      view.setErrorMessage('toEmail-error', '');

   if (title !== '' && receiver !== '') {
      // create a new document on firebase ~~ a conversation
      model.createNewConversation({ title, receiver });
   }
}