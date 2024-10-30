function getWeather() {
  const location = document.getElementById("country_input").value;

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${location}&days=1`)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Logs the complete weather data for debugging
      displayWeatherData(data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

function displayWeatherData(data) {
  const locationInfo = data.location;
  const currentWeather = data.current;
  const forecastWeather = data.forecast.forecastday[0];

  // Update weather display section
  document.getElementById("location").innerText = `Location: ${locationInfo.name}, ${locationInfo.region}, ${locationInfo.country}`;
  document.getElementById("temperature").innerText = `Current Temperature: ${currentWeather.temp_c}°C`;
  document.getElementById("feelsLike").innerText = `Feels Like: ${currentWeather.feelslike_c}°C`;
  document.getElementById("forecast").innerText = `Forecast Temperature: ${forecastWeather.day.avgtemp_c}°C`;

  // Safely access sunset and sunrise if they exist
  const sunset = forecastWeather.astro ? forecastWeather.astro.sunset : "N/A";
  const sunrise = forecastWeather.astro ? forecastWeather.astro.sunrise : "N/A";
  document.getElementById("sunset").innerText = `Sunset: ${sunset}`;
  document.getElementById("sunrise").innerText = `Sunrise: ${sunrise}`;

  document.getElementById("windSpeed").innerText = `Wind Speed: ${currentWeather.wind_kph || "N/A"} kph`;
  document.getElementById("humidity").innerText = `Humidity: ${currentWeather.humidity || "N/A"}%`;
  document.getElementById("weatherIcon").src = currentWeather.condition.icon || "";

  // Clothing recommendation based on temperature
  const clothingRec = currentWeather.temp_c < 15 ? "Wear a jacket" : "Light clothing recommended";
  document.getElementById("forecast").innerText += ` - ${clothingRec}`;
}

// CRUD for Personalized Itineraries
const itineraryList = document.getElementById("itineraryList");
const itineraries = [];

// Add itinerary
document.getElementById("addItinerary").addEventListener("click", () => {
  const title = document.getElementById("itineraryTitle").value;
  const description = document.getElementById("itineraryDescription").value;
  if (title && description) {
      const itinerary = { title, description };
      itineraries.push(itinerary);
      renderItineraries();
  }
});

// Render itineraries
function renderItineraries() {
  itineraryList.innerHTML = "";
  itineraries.forEach((itinerary, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <h3>${itinerary.title}</h3>
          <p>${itinerary.description}</p>
          <button onclick="deleteItinerary(${index})">Delete</button>
      `;
      itineraryList.appendChild(li);
  });
}

// Delete itinerary
function deleteItinerary(index) {
  itineraries.splice(index, 1);
  renderItineraries();
}
