const view = {};

view.setActiveScreen = (screenName) => {

   switch (screenName) {
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
   }
}

view.setErrorMessage = (elementId, message) => {
   document.getElementById(elementId).innerText = message;
}