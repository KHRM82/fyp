const apiKey = "daba80bd96939a26f9d93fd2cf4308fe";

let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    fetchWeatherData(city);
    updateRecentCities(city);
  }
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoordinates(lat, lon);
      },
      () => alert("trying to  retrieve your location.")
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchWeatherData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
      getExtendedForecast(city);
    })
    .catch((error) => {
      alert(error.message);
      console.error("Error fetching weather data:", error);
      hideForecastElements();
    });
}

function fetchWeatherByCoordinates(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error("Unable to fetch data for the current location");
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
      getExtendedForecast(data.name);
    })
    .catch((error) => {
      alert(error.message);
      console.error("Error fetching weather data:", error);
      hideForecastElements();
    });
}

function displayWeather(data) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  if (data.cod === 200) {
    weatherDisplay.classList.remove("hidden");
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("weatherDescription").innerText =
      data.weather[0].description;
    document.getElementById("temperature").innerText = data.main.temp;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("windSpeed").innerText = data.wind.speed;

    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].description;
  } else {
    weatherDisplay.classList.add("hidden");
    hideForecastElements();
    alert("City not found. Please try again.");
  }
}

function getExtendedForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) throw new Error("City not found for extended forecast");
      return response.json();
    })
    .then((data) => {
      displayExtendedForecast(data);
    })
    .catch((error) => {
      alert(error.message);
      console.error("Error fetching extended forecast data:", error);
      hideForecastElements();
    });
}

function displayExtendedForecast(data) {
  const forecastTitle = document.getElementById("forecastTitle");
  const extendedForecast = document.getElementById("extendedForecast");

  forecastTitle.classList.remove("hidden");
  extendedForecast.innerHTML = "";
  extendedForecast.classList.remove("hidden");

  const days = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
  });

  const forecastDates = Object.keys(days).slice(0, 5);

  forecastDates.forEach((date) => {
    const forecast = days[date][0];
    const forecastCard = document.createElement("div");
    forecastCard.className = "bg-white text-black p-4 rounded shadow-md";
    forecastCard.innerHTML = `
            <h3 class="font-bold">${new Date(date).toLocaleDateString()}</h3>
            <div class="flex items-center">
                <img src="https://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }.png" alt="${
      forecast.weather[0].description
    }" class="w-12 h-12 mr-2" />
                <div>
                    <p>Temp: ${forecast.main.temp}°C</p>
                    <p>Wind: ${forecast.wind.speed} m/s</p>
                    <p>Humidity: ${forecast.main.humidity}%</p>
                </div>
            </div>
        `;
    extendedForecast.appendChild(forecastCard);
  });
}

function hideForecastElements() {
  document.getElementById("forecastTitle").classList.add("hidden");
  document.getElementById("extendedForecast").classList.add("hidden");
}

function updateRecentCities(city) {
  if (!recentCities.includes(city)) {
    recentCities.push(city);
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
    populateDropdown();
  }
}

function populateDropdown() {
  const dropdown = document.getElementById("recentCitiesDropdown");
  dropdown.classList.remove("hidden");
  dropdown.innerHTML = recentCities
    .map((city) => `<option value="${city}">${city}</option>`)
    .join("");
}

function getWeatherFromDropdown(select) {
  const city = select.value;
  if (city) {
    fetchWeatherData(city);
  }
}

window.onload = function () {
  if (recentCities.length > 0) {
    populateDropdown();
  }
};
