const view = {};

view.setActiveScreen = (screenName) => {

   switch (screenName) {
      case 'registerPage':
         document.getElementById("app").innerHTML = components.registerPage;

         let toLogin = document.getElementById("toLogin");
         toLogin.addEventListener("click", () => {
            view.setActiveScreen("loginPage");
         });
         break;

      case 'loginPage':
         document.getElementById("app").innerHTML = components.loginPage;
         let toRegister = document.getElementById("toRegister");
         toRegister.addEventListener("click", () => {
            view.setActiveScreen("registerPage");
         });
         break;
         
      default:
         document.getElementById("app").innerHTML = components.registerPage;
         break;
   }
}

