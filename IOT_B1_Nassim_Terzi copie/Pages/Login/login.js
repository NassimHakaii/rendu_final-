function attachCreateAccountListener() {
  document.getElementById("create-account-button").addEventListener("click", function() {
    const formContainer = document.querySelector('.login-form');
    formContainer.innerHTML = `
      <form method="POST" id="form-register">
        <h2>Créer un compte</h2>
        <div class="input-group">
          <label for="name">Nom</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div class="input-group">
          <label for="email">Adresse Mail</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div class="input-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="input-group">
          <label for="confirm-password">Confirmez le mot de passe</label>
          <input type="password" id="confirm-password" name="confirm-password" required />
        </div>
        <button type="submit">S'inscrire</button>
        <button type="button" id="login-button">Se connecter</button>
        <div id="message" class="message"></div>
      </form>
    `;

    attachLoginButtonListener();
    attachRegisterFormListener();
  });
}

function attachLoginButtonListener() {
  document.getElementById("login-button").addEventListener("click", function() {
    const formContainer = document.querySelector('.login-form');
    formContainer.innerHTML = `
      <form method="POST" id="form-login">
        <h2>Connexion</h2>
        <div class="input-group">
          <label for="email">Adresse Mail</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div class="input-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Se connecter</button>
        <button type="button" id="create-account-button">Créer un compte</button>
        <div id="message" class="message"></div>
      </form>
    `;

    attachCreateAccountListener();
    attachLoginFormListener();
  });
}

// Attach initial listeners
attachCreateAccountListener();
