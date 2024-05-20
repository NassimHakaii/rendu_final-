function fetchCharacters() {
  return fetch("https://hp-api.lainocs.fr/characters").then((response) =>
    response.json()
  );
}

async function displayCharacters() {
  const data = await fetchCharacters();
  data.forEach((character) => {
    document.querySelector("#characters").innerHTML += `
                    <a href="cardinfo.html?slug=${character.slug}">
                        <div class="character">
                            <h2>${character.name}</h2>
                            <img src="${character.image}" alt="${character.name}">
                        </div>
                    </a>
                `;
  });
}

displayCharacters();

function fetchCharacter() {
  let url = window.location.search;
  let slug = new URLSearchParams(url).get("slug");

  let datafetch = fetch("https://hp-api.lainocs.fr/characters/" + slug)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const postData = {
        house: data.house,
      };
      try {
        // Envoie de la requête POST avec les données au serveur
        fetch("http://172.20.10.5:3000/lastHouseVisited", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }).then;
      } catch (error) {}
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
  console.log("datafetch", datafetch);
  return datafetch;
}

async function displayCharacter() {
  const data = await fetchCharacter();
  document.querySelector("#character").innerHTML = `
                <h1 style="color: white;">${data.name}</h1>
                <img src="${data.image}" alt="${data.name}">
                <p style="color: white;">${data.blood}</p> 
                <p style="color: white;">${data.house}</p> 
                 <p style="color: white;">${data.actor}</p>
                  <a href="perso.html">Back</a>
            `;
}

displayCharacter();
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

    const characterName = document.createElement("h2");
    characterName.textContent = character.name;

    const characterDetails = document.createElement("div");
    characterDetails.classList.add("character-details");

    const characterImage = document.createElement("img");
    characterImage.src = character.image;
    characterImage.alt = character.name;
    ` <div class="card_buttons">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
          <button class="card_button" data-action="fav"><i class="fa fa-regular fa-heart"></i></button>
        </div>`;
    characterImage.classList.add("character-image");

    const characterHouse = document.createElement("p");
    characterHouse.textContent = `House: ${character.house}`;

    const characterRole = document.createElement("p");
    characterRole.textContent = `Role: ${character.role}`;

    const characterBlood = document.createElement("p");
    characterBlood.textContent = `Blood Status: ${character.blood}`;

    const characterBirthday = document.createElement("p");
    characterBirthday.textContent = `Birthday: ${character.birthday}`;

    const characterActor = document.createElement("p");
    characterActor.textContent = `Actor: ${character.actor}`;

    const characterPatronus = document.createElement("p");
    characterPatronus.textContent = `Patronus: ${character.patronus}`;

    characterDetails.appendChild(characterImage);
    characterDetails.appendChild(characterHouse);
    characterDetails.appendChild(characterRole);
    characterDetails.appendChild(characterBlood);
    characterDetails.appendChild(characterBirthday);
    characterDetails.appendChild(characterActor);
    characterDetails.appendChild(characterPatronus);

    card.appendChild(characterName);
    card.appendChild(characterDetails);
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
