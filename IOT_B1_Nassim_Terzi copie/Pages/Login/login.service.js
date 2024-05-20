/**
 * Service pour la gestion de la connexion utilisateur, permet les appels à l'API pour les fonctionnalités de connexion
 */
document.addEventListener('DOMContentLoaded', () => {
    attachLoginFormListener();
    attachRegisterFormListener();
  });
  
  function displayMessage(message, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = isError ? 'message error' : 'message success';
  }
  
  function attachLoginFormListener() {
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
      formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
  
          if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
          }
  
          const data = await response.json();
  
          if (data.token) {
            localStorage.setItem('token', data.token);
            displayMessage('Connexion réussie, redirection en cours...', false);
            setTimeout(() => {
              window.location.href = '../Profil/profil.html';
            }, 2000);
          } else {
            displayMessage('Erreur de connexion: ' + data.message, true);
          }
        } catch (error) {
          displayMessage('Erreur lors de la requête: ' + error.message, true);
        }
      });
    }
  }
  
  function attachRegisterFormListener() {
    const formRegister = document.getElementById('form-register');
    if (formRegister) {
      formRegister.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const name = document.getElementById('name').value;
  
        if (password !== confirmPassword) {
          return displayMessage('Les mots de passe ne correspondent pas', true);
        }
  
        try {
          const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
          });
  
          if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription');
          }
  
          const data = await response.json();
          if (data.message) {
            displayMessage('Erreur lors de l\'inscription: ' + data.message, true);
          } else {
            displayMessage('Inscription réussie, vous pouvez vous connecter', false);
            setTimeout(() => {
              window.location.href = './login.html';
            }, 10000);
          }
        } catch (error) {
          displayMessage('Erreur lors de la requête: ' + error.message, true);
        }
      });
    }
  }
  