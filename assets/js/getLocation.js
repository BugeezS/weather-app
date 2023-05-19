const inputCity = document.querySelector('.city_choice__input_text');
const buttonCity = document.querySelector('.city_choice__button');
const section = document.querySelector('.display_weather__section');

export async function getLocation() {
    try {
        buttonCity.addEventListener('click', async () => {
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

                const firstDayDiv = document.createElement("div");
                firstDayDiv.classList.add("display_weather__div")
                section.appendChild(firstDayDiv);

                const firstDayP = document.createElement("p");
                firstDayP.textContent = forecastData.list[0].weather[0].main;
                firstDayDiv.appendChild(firstDayP);

                const firstDayPt = document.createElement("p");
                firstDayPt.textContent = forecastData.list[0].main.temp + "°C";
                firstDayDiv.appendChild(firstDayPt);
                
                const secondtDayDiv = document.createElement("div");
                secondtDayDiv.classList.add("display_weather__div")
                section.appendChild(secondtDayDiv);

                const secondDayP = document.createElement("p");
                secondDayP.textContent = forecastData.list[8].weather[0].main;
                secondtDayDiv.appendChild(secondDayP);

                const secondDayPt = document.createElement("p");
                secondDayPt.textContent = forecastData.list[8].main.temp + "°C";
                secondtDayDiv.appendChild(secondDayPt);

                const thirdDayDiv = document.createElement("div");
                thirdDayDiv.classList.add("display_weather__div")
                section.appendChild(thirdDayDiv);

                const thirdDayP = document.createElement("p");
                thirdDayP.textContent = forecastData.list[16].weather[0].main;
                thirdDayDiv.appendChild(thirdDayP);

                const thirdDayPt = document.createElement("p");
                thirdDayPt.textContent = forecastData.list[16].main.temp + "°C";
                thirdDayDiv.appendChild(thirdDayPt);

                const fourthDayDiv = document.createElement("div");
                fourthDayDiv.classList.add("display_weather__div")
                section.appendChild(fourthDayDiv);

                const fourthDayP = document.createElement("p");
                fourthDayP.textContent = forecastData.list[24].weather[0].main;
                fourthDayDiv.appendChild(fourthDayP);

                const fourthDayPt = document.createElement("p");
                fourthDayPt.textContent = forecastData.list[24].main.temp + "°C";
                fourthDayDiv.appendChild(fourthDayPt);

                const fiveDayDiv = document.createElement("div");
                fiveDayDiv.classList.add("display_weather__div")
                section.appendChild(fiveDayDiv);

                const fiveDayP = document.createElement("p");
                fiveDayP.textContent = forecastData.list[32].weather[0].main;
                fiveDayDiv.appendChild(fiveDayP);

                const fiveDayPt = document.createElement("p");
                fiveDayPt.textContent = forecastData.list[32].main.temp + "°C";
                fiveDayDiv.appendChild(fiveDayPt);
            }
        });
    } catch (error) {
        console.error(error);
        // Show an error message to the user
        section.innerHTML = '<p class="citation__error">Failed to fetch data. Please try again later.</p>';
    }
}
