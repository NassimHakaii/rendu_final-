document.addEventListener("DOMContentLoaded", () => {
  const openModalButton = document.getElementById("openModalButton");
  const exchangeModal = document.getElementById("exchangeModal");
  const closeModalButton = document.getElementById("closeModalButton");
  const exchangeForm = document.getElementById("exchangeForm");
  const selectUser = document.getElementById("selectUser");
  const selectCard = document.getElementById("selectCard");

  // Ouvrir la modal au clic sur le bouton flottant
  openModalButton.addEventListener("click", () => {
    exchangeModal.style.display = "block";
  });

  // Fermer la modal au clic sur le bouton de fermeture
  closeModalButton.addEventListener("click", () => {
    exchangeModal.style.display = "none";
  });

  // Fermer la modal lorsque l'utilisateur clique en dehors de la modal
  window.addEventListener("click", (event) => {
    if (event.target === exchangeModal) {
      exchangeModal.style.display = "none";
    }
  });

  // Empêcher la propagation du clic à l'intérieur de la modal
  exchangeModal.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Soumettre le formulaire d'échange
  exchangeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Vérifier si un utilisateur est sélectionné
    if (selectUser.value === "") {
      alert("Veuillez sélectionner un utilisateur avant d'envoyer la carte.");
      return; // Arrêter la soumission du formulaire
    }

    // Traitement du formulaire d'échange ici
    // Vous pouvez envoyer les données à votre serveur pour traitement

    // Notification de succès
    alert("La carte a été envoyée avec succès!");

    // Fermer la modal lorsque le traitement est terminé
    exchangeModal.style.display = "none";
  });

  // Example data for users
  const users = [
    { id: 1, name: "Adam" },
    { id: 2, name: "Noé" },
    { id: 3, name: "Alexia" },
  ];

  // Populate the select elements with user data
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.text = user.name;
    selectUser.appendChild(option);
  });

  // Fetch card names from API and populate the select element
  async function fetchCardNames() {
    const apiUrl = "https://hp-api.lainocs.fr/characters";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.map((character) => character.name);
  }

  async function displayCardNames() {
    const characterNames = await fetchCardNames();
    selectCard.innerHTML = ""; // Clear previous options

    characterNames.forEach((name, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = name;
      selectCard.appendChild(option);
    });
  }

  displayCardNames();
});