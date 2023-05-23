const inputCity = document.querySelector(".city_choice__input_text");
const buttonCity = document.querySelector(".city_choice__button");
const section = document.querySelector(".display_weather__section");
const divClass = "display_weather__div";
let temperatureChart; // Variable to store the chart instance

export async function getLocation() {
  try {
    const handleButtonClick = async () => {
      // Clear existing div elements
      section.querySelectorAll("." + divClass).forEach((div) => {
        div.remove();
      });

      const response = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          inputCity.value +
          "&appid=b966343bfc8e28ecda651af14caf032a"
      );
      const jsonResponse = await response.json();

      if (jsonResponse.length > 0) {
        const locationData = jsonResponse[0];
        const lat = locationData.lat;
        const lon = locationData.lon;

        const fetchMeteo = async (lat, lon) => {
          const response = await fetch(
            "https://api.openweathermap.org/data/2.5/forecast?lat=" +
              lat +
              "&lon=" +
              lon +
              "&appid=b966343bfc8e28ecda651af14caf032a&units=metric"
          );
          return response.json();
        };

        const forecastData = await fetchMeteo(lat, lon);

        // Create arrays to store chart data
        const labels = [];
        const temperatures = [];

        for (let i = 0; i < 5; i++) {
          const dayDiv = document.createElement("div");
          dayDiv.classList.add(divClass);
          section.appendChild(dayDiv);

          if (forecastData.list[i * 8].weather[0].main === "Clouds") {
            const imgMet = document.createElement("img");
            imgMet.classList.add("imgMet");
            imgMet.src = "./assets/img/nuageux.png";
            dayDiv.appendChild(imgMet);
          } else if (forecastData.list[i * 8].weather[0].main === "Clear") {
            const imgMet = document.createElement("img");
            imgMet.classList.add("imgMet");
            imgMet.src = "./assets/img/clair.png";
            dayDiv.appendChild(imgMet);
          } else if (forecastData.list[i * 8].weather[0].main === "Rain") {
            const imgMet = document.createElement("img");
            imgMet.classList.add("imgMet");
            imgMet.src = "./assets/img/rain.png";
            dayDiv.appendChild(imgMet);
          }

          const dayP = document.createElement("p");
          dayP.textContent = forecastData.list[i * 8].weather[0].main;
          dayDiv.appendChild(dayP);

          const dayPt = document.createElement("p");
          dayPt.textContent = forecastData.list[i * 8].main.temp + "°C";
          dayDiv.appendChild(dayPt);

          const dayDate = document.createElement("p");
          dayDate.textContent = forecastData.list[i * 8].dt_txt;
          dayDiv.appendChild(dayDate);

          // Store data for chart
          labels.push(forecastData.list[i * 8].dt_txt);
          temperatures.push(forecastData.list[i * 8].main.temp);
        }

        // Clear existing chart if it exists
        if (temperatureChart) {
          temperatureChart.destroy();
        }

        // Create chart
        createChart(labels, temperatures);

        // Store input and data in local storage
        localStorage.setItem("inputCity", inputCity.value);
        localStorage.setItem("forecastData", JSON.stringify(forecastData));
      }
    };

    const createChart = (labels, temperatures) => {
      const ctx = document.getElementById("temperatureChart").getContext("2d");
      temperatureChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature",
              data: temperatures,
              backgroundColor: "rgba(0, 123, 255, 1)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  color: "black",
                },
              },
            },
            tooltip: {
              backgroundColor: "white",
              titleColor: "black",
              bodyColor: "black",
              borderColor: "black",
              borderWidth: 1,
            },
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            },
          },
        },
      });
    };

    buttonCity.addEventListener("click", handleButtonClick);

    const handleInputKeyPress = (event) => {
      if (event.key === "Enter") {
        handleButtonClick();
      }
    };

    inputCity.addEventListener("keypress", handleInputKeyPress);

    // Restore input and data from local storage if available
    const storedInput = localStorage.getItem("inputCity");
    const storedForecastData = localStorage.getItem("forecastData");

    if (storedInput && storedForecastData) {
      inputCity.value = storedInput;
      const forecastData = JSON.parse(storedForecastData);
      createChart(forecastData.labels, forecastData.temperatures);
    }
  } catch (error) {
    console.error(error);
    // Show an error message to the user
    section.innerHTML =
      '<p class="citation__error">Failed to fetch data. Please try again later.</p>';
  }
}
