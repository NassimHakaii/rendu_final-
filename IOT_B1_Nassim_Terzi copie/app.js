function darkMode() {
  const darkModeButton = document.querySelectorAll(".dark_mode_button");
  const rulesContent = document.querySelectorAll(".rules_content");
  const body = document.querySelector("body");
  const titleForm = document.querySelectorAll(".tab_content_title");
  const labelForm = document.querySelectorAll("label");

  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark-mode");
    rulesContent.forEach((container) => {
      container.classList.add("dark-mode");
    });
    titleForm.forEach((title) => {
      title.classList.add("dark-mode");
    });
    labelForm.forEach((form) => {
      form.classList.add("dark-mode");
    });
  } else {
    body.classList.remove("dark-mode");
    rulesContent.forEach((container) => {
      container.classList.remove("dark-mode");
    });
    titleForm.forEach((title) => {
      title.classList.remove("dark-mode");
    });
    labelForm.forEach((form) => {
      form.classList.remove("dark-mode");
    });
  }
  darkModeButton.forEach((button) => {
    button.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      rulesContent.forEach((container) => {
        container.classList.toggle("dark-mode");
      });
      titleForm.forEach((title) => {
        title.classList.toggle("dark-mode");
      });
      labelForm.forEach((form) => {
        form.classList.toggle("dark-mode");
      });
      localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
      localStorage.setItem(
        "darkMode",
        rulesContent.classList.contains("dark-mode")
      );
      localStorage.setItem(
        "darkMode",
        titleForm.classList.contains("dark-mode")
      );
      localStorage.setItem(
        "darkMode",
        labelForm.classList.contains("dark-mode")
      );
    });
  });
}

function Carousel() {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  if (!swiper) return;
}

function navTap() {
  const btnOpen = document.getElementById("btn_open");
  const btnClose = document.getElementById("btn_close");
  const navContent = document.getElementById("nav_content");
  if (!navContent) return;
  btnOpen.addEventListener("click", function () {
    btnOpen.style.display = "none";
    navContent.style.display = "block";
    navContent.classList.remove("closeTab");
    navContent.classList.add("openTab");
  });

  btnClose.addEventListener("click", function () {
    navContent.classList.remove("openTab");
    navContent.classList.add("closeTab");
  });

  navContent.addEventListener("animationend", function () {
    if (navContent.classList.contains("closeTab")) {
      navContent.style.display = "none";
      btnOpen.style.display = "flex";
    }
  });
}

// function formVerificationSignup() {
//   const form = document.getElementById("signup_form");
//   if (!form) return;

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     let email = document.querySelector("#email_signup");
//     let name = document.querySelector("#name");
//     let password = document.querySelector("#password_signup");
//     let confirmPassword = document.querySelector("#confirmPassword");

//     const errorList = document.getElementById("error_list");
//     errorList.innerHTML = "";

//     if (name.value === "" || name.value.length < 6) {
//       addErrorToList("Le nom doit contenir au moins 6 caractères");
//     }

//     if (email.value === "" || email.value.indexOf("@") === -1) {
//       addErrorToList("L'adresse email n'est pas valide");
//     }

//     const regexPassword =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{8,}$/;

//     if (
//       password.value.length < 8 ||
//       regexPassword.test(password.value) === false
//     ) {
//       addErrorToList(
//         "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
//       );
//     }

//     if (
//       password.value !== confirmPassword.value ||
//       confirmPassword.value === ""
//     ) {
//       addErrorToList("Les mots de passe ne correspondent pas");
//     }

//     if (errorList.children.length > 0) {
//       const errorMessage = document.querySelector(".error_form");
//       errorMessage.style.display = "block";
//     } else {
//       const successMessage = document.querySelector(".success_form");
//       successMessage.style.display = "block";
//       setTimeout(() => {
//         form.submit();
//       }, 2000);
//     }console.log("Formulaire envoyé");

//     window.location.replace("/signup");

//   });

//   function addErrorToList(errorMessage) {
//     const errorList = document.getElementById("error_list");
//     const errorItem = document.createElement("li");
//     errorItem.textContent = errorMessage;
//     errorList.appendChild(errorItem);
//   }
// }

function formVerificationLogin() {
  const formLogin = document.getElementById("login_form");
  if (!formLogin) return;

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.querySelector("#email_login");
    let password = document.querySelector("#password_login");

    const errorList = document.getElementById("error_list");
    errorList.innerHTML = "";

    if (email.value === "" || email.value.indexOf("@") === -1) {
      addErrorToList("L'adresse email n'est pas valide");
    }

    if (password.value === "" || password.value.length < 8) {
      addErrorToList("Le mot de passe doit contenir au moins 8 caractères");
    }

    if (errorList.children.length > 0) {
      const errorMessage = document.querySelector(".error_form");
      errorMessage.style.display = "block";
    } else {
      const successMessage = document.querySelector(".success_form");
      successMessage.style.display = "block";
      setTimeout(() => {
        formLogin.submit();
      }, 2000);
    }

    console.log("Formulaire envoyé");
  });
  function addErrorToList(errorMessage) {
    const errorList = document.getElementById("error_list");
    const errorItem = document.createElement("li");
    errorItem.textContent = errorMessage;
    errorList.appendChild(errorItem);
  }
}

function burgerMenu() {
  const burgerIcon = document.getElementById("menuIcon");
  const overlay = document.getElementById("overlay");
  const closeIcon = document.getElementById("closeIcon");

  if (!burgerIcon) return;

  burgerIcon.addEventListener("click", function () {
    overlay.style.display = "flex";
    burgerIcon.style.display = "none";
    closeIcon.style.display = "block";
  });
  closeIcon.addEventListener("click", function () {
    overlay.style.display = "none";
    closeIcon.style.display = "none";
    burgerIcon.style.display = "block";
  });
}
function openTab() {
  const tabButtons = document.querySelectorAll(".account_tab_button");
  const tabContent = document.querySelectorAll(".tab_content");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      tabContent.forEach((content) => {
        content.style.display = "none";
      });

      const tabName = button.dataset.tab;
      const tabActive = document.getElementById(tabName);
      tabActive.style.display = "block";
    });
  });
}

function buttonFriends() {
  // Dans votre frontend JavaScript où vous gérez les clics sur le bouton "Accepter"
  const acceptButtons = document.querySelectorAll(".acceptButton");
  const deleteButtons = document.querySelectorAll(".deleteButton");
  if (!deleteButtons) return;
  if (acceptButtons) {
    acceptButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const username = button
          .closest(".friend")
          .getAttribute("data-username");
        // Utilisez le nom d'utilisateur pour construire l'URL de la requête
        window.location.href = `/acceptFriend?friend=${username}`;
      });
    });
  }
  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const username = button
          .closest(".friend")
          .getAttribute("data-username");
        // Utilisez le nom d'utilisateur pour construire l'URL de la requête
        window.location.href = `/deletefriend?friend=${username}`;
      });
    });
  }
}


function cardInfo() {
  const card = document.querySelectorAll(".card_button_readmore");

  if (!card) return;
  card.forEach((card) => {
    card.addEventListener("click", function () {
      const cardId = card.closest(".card").getAttribute("data-id");
      console.log(cardId, "cardId appjs");
      // renvoie sur la page de la carte
      window.location.href = `/cardinfo.html?slug=${cardId}`;
    });
  });
}


function newRequestExchange() {
  const btnExchange = document.getElementById("btn_exchange");
  const exchangeForm = document.getElementById("exchange");
  const closeExchange = document.getElementById("close_exchange");

  if (btnExchange && exchangeForm && closeExchange) {
    btnExchange.addEventListener("click", function () {
      exchangeForm.style.display = "block";
    });

    closeExchange.addEventListener("click", function () {
      exchangeForm.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  navTap();
  openTab();

  formVerificationLogin();
  newRequestExchange();

  // formVerificationSignup();
  // Carousel();
  filterCards();
  setTimeout(() => {
    cardInfo();
  }, 1000);
  setTimeout(() => {
    buttonFriends();
  }, 100);
});

function openNav() {
  var sidenav = document.getElementById("mySidenav");
  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
  } else {
    sidenav.style.width = "250px";
  }
}
// Fonction pour gérer le mode favori
function toggleFavorite(button) {
  button.classList.toggle("active"); // Ajoute ou supprime la classe 'active' au bouton
}

// Fonction pour filtrer les cartes par favori
function filterFavorites() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const favoriteButton = card.querySelector(".favorite-btn");
    if (!favoriteButton.classList.contains("active")) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });
}

// Écouteur d'événement pour le bouton de filtrage des favoris
document
  .getElementById("BtnFavorites")
  .addEventListener("click", filterFavorites);
// Affichage du contenu de la carte en fonction de l'onglet cliqué
function displayTab(tabName, tabContent) {
  const tabs = document.getElementsByClassName("tabs__item");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].className = tabs[i].className.replace("tabs__item--selected", "");
    document.getElementById(tabs[i].getAttribute("data-tab")).style.display =
      "none";
  }
  document.getElementById(tabContent).style.display = "block";
  tabName.className += " tabs__item--selected";
}

// Gestionnaire d'évenements sur les onglets
const tabs = document.querySelectorAll(".tabs a");
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    let tabName = e.target;
    let tabContent = document.getElementById(tabName.getAttribute("href"));
    displayTab(tabName, tabContent.id);
  });
});

// Vérification si une personne est connectée ou non et modification de l'interface en conséquence
window.addEventListener("DOMContentLoaded", () => {
  // Récupération de l'état de connexion de l'utilisateur depuis le localStorage
  const userConnected = JSON.parse(localStorage.getItem("user_connected"));

  // Si il n'y a pas d'utilisateur connecté, on masque certaines parties de l'interface
  if (!userConnected) {
    // On cache le formulaire de connexion/inscription
    document.getElementById("formConnection").style.display = "none";

    // On ajoute un écouteur d'événement sur le bouton Inscription pour afficher le formulaire de connexion
    document
      .getElementById("btnInscription")
      .addEventListener("click", function () {
        // On récupère le formulaire de connexion qui était caché
        let formConnexion = document.getElementById("formConnection");

        // On le déplace à la position du bouton Inscription
        formConnexion.style.left = btnInscription.offsetLeft + "px";
        formConnexion.style.top = btnInscription.offsetTop + "px";

        // On le rend visible
        formConnexion.style.display = "block";
      });

    // On ajoute un écouteur d'événement sur le bouton Connexion pour fermer le formulaire de connexion
    document
      .getElementById("btnCloseForm")
      .addEventListener("click", function () {
        document.getElementById("formConnection").style.display = "none";
      });
  } else {
    // Sinon, on affiche son nom dans l'entête et on peut accéder aux fonctionnalités utilisateurs
    document.querySelector(
      ".pseudo"
    ).textContent = `Connecté en tant que ${userConnected.username}`;
    document.getElementById("navUser").classList.add("active");
    document.getElementById("navDeconnexion").classList.remove("hidden");
    document.getElementById("navCreationCompte").classList.add("hidden");
  }
});

// Gestion des événements de clic sur les boutons de navigation
document.getElementById("navAccueil").addEventListener("click", function () {
  location.href = "index.html";
});
