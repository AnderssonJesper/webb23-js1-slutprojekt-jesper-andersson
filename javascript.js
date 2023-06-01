const apiKey = "4795a2336fc831d2a64f0fb9c9f0975b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiForecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");
const searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchBox.value;
  const forecastHours = document.querySelector("#forecastHours").value;
  checkWeather(city);

  if (forecastHours === "0") {
    clearForecast();
  } else {
    getForecast(city, forecastHours);
  }
});

function clearForecast() {
  for (let i = 1; i <= 6; i++) {
    const forecastElement = document.getElementById(`forecast${i}`);
    forecastElement.style.display = "none";
  }
}

async function getForecast(city, forecastHours) {
  const response = await fetch(`${apiForecast}${city}&appid=${apiKey}`);
  const data = await response.json();

  if (response.status === 200) {
    const forecastList = data.list;
    const forecastIntervals = forecastList.slice(0, forecastHours / 3);
    clearForecast();

    forecastIntervals.forEach((forecast, index) => {
      const forecastTime = forecast.dt_txt.split(" ")[1];
      const forecastTemp = Math.round(forecast.main.temp) + "°C";
      const forecastIcon = forecast.weather[0].icon;

      const forecastElement = document.getElementById(`forecast${index + 1}`);
      forecastElement.style.display = "block";
      forecastElement.querySelector(".forecastTime").innerHTML = forecastTime;
      forecastElement.querySelector(".forecastTemp").innerHTML = forecastTemp;
      forecastElement.querySelector(".forecastIcon").src = `https://openweathermap.org/img/wn/${forecastIcon}.png`;
    });
  }
}

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  const data = await response.json();



  if (response.status === 404 || response.status === 500) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".weatherDescription").textContent = "";
    document.querySelector(".error").textContent = "Staden kunde inte hittas!";

    } else if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".weatherDescription").textContent = "";
    document.querySelector(".error").textContent = "Ett nätverksfel uppstod. Kontrollera din internetanslutning.";
  
  } else {
    document.querySelector(".weatherDescription").style.display = "block";
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + "m/s";
    document.querySelector(".weatherDescription").textContent = data.weather[0].description;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "https://openweathermap.org/img/w/02d.png";
    } else if (data.weather[0].main === "Clear"){
          document.querySelector(".weatherDescription").style.color = "yellow";
      weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
    } else if (data.weather[0].main === "Thunderstorm") {
      weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
    } else if (data.weather[0].main === "Scattered clouds") {
      weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
    } else if (data.weather[0].main === "Broken clouds") {
      weatherIcon.src = "https://openweathermap.org/img/wn/04d@2x.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  const forecastHours = document.querySelector("#forecastHours").value;
  checkWeather(city);
  if (forecastHours === "0") {
    clearForecast();
  } else {
    getForecast(city, forecastHours);
  }
});
