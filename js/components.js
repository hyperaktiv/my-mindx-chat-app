const components = {};

components.welcomePage = "<h2>MindX Chat-app</h2>";

components.registerPage = `
   <div class="register-container">
      <div class="background-img"></div>
      <div class="form-wrapper">
         <div class="register-header">MindX Chat</div>
         <form action="" method="post" id="register-form">
            <div class="name-wrapper">
               <div class="input-wrapper">
                  <input type="text" name="firstName" placeholder="First Name" />
                  <span id="firstName-error" class="error"></span>
               </div>
               <div class="input-wrapper">
                  <input type="text" name="lastName" placeholder="Last Name" />
                  <span id="lastName-error" class="error"></span>
               </div>
            </div>
            <div class="input-wrapper">
               <input type="email" name="email" id="" placeholder="Email">
               <span id="email-error" class="error"></span>
            </div>
            <div class="input-wrapper">
               <input type="password" name="password" id="" placeholder="Password">
               <span id="password-error" class="error"></span>
            </div>
            <div class="input-wrapper">
               <input type="password" name="rePassword" id="" placeholder="Re-password">
               <span id="repassword-error" class="error"></span>
            </div>
            <div class="form-action">
               <p>Already have an account?&nbsp;<span id="toLogin" class="pointer">Login</span></p>
               <button class="btn" type="submit" id="reg-submit">Register</button>
            </div>
         </form>
      </div>
   </div>`;

components.loginPage = `
   <div class="login-container">
      <div class="background-img"></div>
      <div class="form-wrapper">
         <div class="login-header">MindX Chat</div>
         <form action="" method="post" id="login-form">
            <div class="input-wrapper">
               <input type="email" name="email" id="" placeholder="Email">
               <span id="email-error" class="error"></span>
            </div>
            <div class="input-wrapper">
               <input type="password" name="password" id="" placeholder="Password">
               <span id="password-error" class="error"></span>
            </div>
            <div class="form-action">
               <p>Don't have an account?&nbsp;<span id="toRegister" class="pointer">Register</span></p>
               <button class="btn" type="submit" id="login-submit">Login</button>
            </div>
         </form>
      </div>
   </div>`;