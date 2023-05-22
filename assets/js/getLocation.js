const inputCity = document.querySelector('.city_choice__input_text');
const buttonCity = document.querySelector('.city_choice__button');
const section = document.querySelector('.display_weather__section');
const divClass = 'display_weather__div';

export async function getLocation() {
    try {
        buttonCity.addEventListener('click', async () => {
            // Clear existing div elements
            section.querySelectorAll('.' + divClass).forEach((div) => {
                div.remove();
            });

            const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity.value + "&appid=b966343bfc8e28ecda651af14caf032a");
            const jsonResponse = await response.json();

            if (jsonResponse.length > 0) {
                const locationData = jsonResponse[0];
                const lat = locationData.lat;
                const lon = locationData.lon;

                const fetchMeteo = async (lat, lon) => {
                    const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=b966343bfc8e28ecda651af14caf032a&units=metric");
                    return response.json();
                };

                const forecastData = await fetchMeteo(lat, lon);

                for (let i = 0; i < 5; i++) {
                    const dayDiv = document.createElement("div");
                    dayDiv.classList.add(divClass);
                    section.appendChild(dayDiv);

                    const dayP = document.createElement("p");
                    dayP.textContent = forecastData.list[i * 8].weather[0].main;
                    dayDiv.appendChild(dayP);

                    const dayPt = document.createElement("p");
                    dayPt.textContent = forecastData.list[i * 8].main.temp + "°C";
                    dayDiv.appendChild(dayPt);

                    const dayDate = document.createElement("p");
                    dayDate.textContent = forecastData.list[i * 8].dt_txt;
                    dayDiv.appendChild(dayDate);
                }
            }
        });
    } catch (error) {
        console.error(error);
        // Show an error message to the user
        section.innerHTML = '<p class="citation__error">Failed to fetch data. Please try again later.</p>';
    }
}
