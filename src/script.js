let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let h2 = document.querySelector("h2");

h2.innerHTML = `${day}, ${month} ${date} ${hour}:${minute}`;

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  let apiKey = "54e9eef436213904de67ea13a2835d75";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", changeCity);

function displayMain(city) {
  let apiKey = "54e9eef436213904de67ea13a2835d75";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showForecast() {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  let forecastCode = `<div class="row"><div class="col-1"></div>`;
  days.forEach(function (day) {
    forecastCode =
      forecastCode +
      `<div class="col-2">
                ${day}
                <br />
                <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" class="forecast-icons" />
                <br />
                <span class="weather-forecast-temp-max">
                 19°</span> 
                 <span class="weather-forecast-temp-min">17°</span>
              </div>`;
  });

  forecastCode = forecastCode + `</div>`;

  let forecastDisplay = document.querySelector("#forecast");
  forecastDisplay.innerHTML = forecastCode;
}

function getForecast(coordinates) {
  let apiKey = "54e9eef436213904de67ea13a2835d75";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let currentTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = currentTemp;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let iconCurrent = document.querySelector("#icon-current");
  iconCurrent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconCurrent.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "54e9eef436213904de67ea13a2835d75";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let getCurrentPosition = document.querySelector("button");
getCurrentPosition.addEventListener("click", showCurrentLocation);

displayMain("Amsterdam");
