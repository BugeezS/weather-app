const cityInput = document.querySelector(".city_choice__input_text");
const autocompleteList = document.querySelector(".autocomplete-list");
const button = document.querySelector(".city_choice__button"); // Replace "button" with the selector for your button element

// Function to hide the autocomplete list
function hideAutocompleteList() {
  autocompleteList.style.display = "none";
}

cityInput.addEventListener("input", () => {
  const inputText = cityInput.value;

  // Call the city API to fetch matching city names
  fetchCityNames(inputText)
    .then((data) => {
      const cityNames = data.geonames.map((result) => result.name);
      displayAutocompleteOptions(cityNames);
    })
    .catch((error) => {
      console.error("Error fetching city names:", error);
    });
});

// Event listener for the Enter key press
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    hideAutocompleteList();
  }
});

// Event listener for the button click
button.addEventListener("click", () => {
  hideAutocompleteList();
});

export function fetchCityNames(query) {
  const username = "bugeez"; // Replace with your GeoNames username
  const url = `https://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=${username}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch city names.");
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error("Error fetching city names:", error);
    });
}

export function displayAutocompleteOptions(cityNames) {
  // Clear previous autocomplete options
  autocompleteList.innerHTML = "";

  cityNames.forEach((name) => {
    const option = document.createElement("li");
    option.textContent = name;
    option.addEventListener("click", () => {
      cityInput.value = name;
      hideAutocompleteList();
    });
    autocompleteList.appendChild(option);
  });

  // Show autocomplete options
  autocompleteList.style.display = "block";
}
