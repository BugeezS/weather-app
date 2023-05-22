const inputCity = document.querySelector('.city_choice__input_text');
const buttonCity = document.querySelector('.city_choice__button');
const body = document.querySelector('body');

export function background() {
  buttonCity.addEventListener('click', () => {
    const cityName = inputCity.value; // Get the value of the input field

    fetch("https://api.unsplash.com/search/photos?query=" + cityName + "&client_id=5KCpP0aJFCsXMTt0HYe6s41wt8d1pC0uYwpqhq2JGnM")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const imageUrl = data.results[0].urls.regular; // Get the URL of the first image result
        body.style.backgroundImage = "url(" + imageUrl + ")";
        body.style.backgroundRepeat = "no-repeat"; // Set background-repeat to no-repeat
        body.style.backgroundSize = "cover"; // Set background-size to cover
      })
      .catch((error) => {
        console.error("Error fetching background image:", error);
      });
  });
}
