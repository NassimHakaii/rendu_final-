function fetchCard() {
  // Fetch les cartes de personnages de l'API
  const apiUrl = "https://hp-api.lainocs.fr/characters";
  return fetch(apiUrl).then((response) => response.json()); // Récupère les données de l'API
}

async function displayCard() {
  // Affiche les cartes de personnages
  const data = await fetchCard(); // Récupère les données de l'API
  console.log(data);
  let gallery = document.querySelector(".cards_container_gallery");

  for (let i = 0; i < data.length; i++) {
    // Boucle pour afficher les cartes
    gallery.innerHTML += `
      <div class="card" data-house="${data[i].house}" data-id="${data[i].slug}">
        <div class="card_image_container">
          <img
            class="card_image"
            src="${data[i].image}"
            alt="${data[i].name}"
          />
        </div>
        <h2 class="card_title">${data[i].name}</h2>
        <div class="card_buttons">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          <button class="card_button" data-action="fav"><i class="fa fa-regular fa-heart"></i></button>
          <div class="card_button_readmore" data-slug="${data[i].slug}">En savoir plus</div>
        </div>
      </div>
    `;
  }

  // Charger l'état des favoris depuis le stockage local
  loadFavoriteState();

  // Ajout du gestionnaire d'événements pour les boutons de favori
  const favButtons = document.querySelectorAll(
    ".card_button[data-action='fav']"
  );
  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("red"); // Ajoute ou supprime la classe "red" au clic
      saveFavoriteState(button); // Sauvegarde l'état du favori dans le stockage local
    });
  });
}

// Fonction pour sauvegarder l'état du favori dans le stockage local
function saveFavoriteState(button) {
  const cardId = button.closest(".card").dataset.id;
  const isFavorite = button.classList.contains("red");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  favorites[cardId] = isFavorite;
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Fonction pour charger l'état des favoris depuis le stockage local
function loadFavoriteState() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  Object.entries(favorites).forEach(([cardId, isFavorite]) => {
    const button = document.querySelector(
      `.card[data-id='${cardId}'] .card_button[data-action='fav']`
    );
    if (button) {
      if (isFavorite) {
        button.classList.add("red");
      } else {
        button.classList.remove("red");
      }
    }
  });
}

displayCard(); // Appel de la fonction pour afficher les cartes

const searchBar = document.getElementById("searchBar");
const cardList = document.getElementById("cardList");

searchBar.addEventListener("input", async (e) => {
  const searchTerm = e.target.value.trim().toLowerCase();
  if (searchTerm.length >= 1) {
    try {
      const response = await fetch("https://hp-api.lainocs.fr/characters");
      const data = await response.json();
      const filteredCharacters = data.filter((character) =>
        character.name.toLowerCase().includes(searchTerm)
      );
      renderCardList(filteredCharacters);
    } catch (error) {
      console.error(error);
    }
  } else {
    cardList.innerHTML = "";
  }
});

function renderCardList(characters) {
  cardList.innerHTML = "";

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.color = "white";

    const characterName = document.createElement("h2");
    characterName.textContent = character.name;

    const characterDetails = document.createElement("div");
    characterDetails.classList.add("character-details");

    const characterImage = document.createElement("img");
    characterImage.src = character.image;
    characterImage.alt = character.name;
    characterImage.classList.add("character-image");

    const characterHouse = document.createElement("p");
    characterHouse.textContent = `House: ${character.house}`;
    characterHouse.style.color = "white";

    const characterRole = document.createElement("p");
    characterRole.textContent = `Role: ${character.role}`;
    characterRole.style.color = "white";

    const characterBlood = document.createElement("p");
    characterBlood.textContent = `Blood Status: ${character.blood}`;
    characterBlood.style.color = "white";

    const characterBirthday = document.createElement("p");
    characterBirthday.textContent = `Birthday: ${character.birthday}`;
    characterBirthday.style.color = "white";

    const characterActor = document.createElement("p");
    characterActor.textContent = `Actor: ${character.actor}`;
    characterActor.style.color = "white";

    const characterPatronus = document.createElement("p");
    characterPatronus.textContent = `Patronus: ${character.patronus}`;
    characterPatronus.style.color = "white";

    const cardButtons = document.createElement("div");
    cardButtons.classList.add("card_buttons");

    const favButton = document.createElement("button");
    favButton.classList.add("card_button");
    favButton.dataset.action = "fav";
    favButton.innerHTML = '<i class="fa fa-heart"></i>';
    favButton.style.color = "white";

    // Add event listener to toggle favorite status
    favButton.addEventListener("click", () => {
      if (favButton.classList.toggle("favorite")) {
        favButton.style.color = "red";
      } else {
        favButton.style.color = "white";
      }
    });

    cardButtons.appendChild(favButton);

    characterDetails.appendChild(characterImage);
    characterDetails.appendChild(characterHouse);
    characterDetails.appendChild(characterRole);
    characterDetails.appendChild(characterBlood);
    characterDetails.appendChild(characterBirthday);
    characterDetails.appendChild(characterActor);
    characterDetails.appendChild(characterPatronus);

    card.appendChild(characterName);
    card.appendChild(characterDetails);
    card.appendChild(cardButtons);
    cardList.appendChild(card);
  });
}

// Ajout du gestionnaire d'événements pour les boutons de favori
const favButtons = document.querySelectorAll(".card_button[data-action='fav']");
favButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("red"); // Ajoute ou supprime la classe "red" au clic
  });
});
// Ajout du gestionnaire d'événements pour les boutons "En savoir plus"
const readMoreButtons = document.querySelectorAll(".card_button_readmore");
readMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const slug = button.dataset.slug;
    window.location.href = `/cardinfo.html?slug=${slug}`; // Redirection vers la page cardinfo.html avec le slug du personnage
  });
});
