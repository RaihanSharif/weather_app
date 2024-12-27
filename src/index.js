import "./styles.css";
import clear_day from "./resources/clear-day.svg";
import clear_night from "./resources/clear-night.svg";
import cloudy from "./resources/cloudy.svg";
import fog from "./resources/fog.svg";
import hail from "./resources/hail.svg";
import partly_cloudy_day from "./resources/partly-cloudy-day.svg";
import partly_cloudy_night from "./resources/partly-cloudy-night.svg";
import rain_snow_showers_day from "./resources/rain-snow-showers-day.svg";
import rain_snow_showers_night from "./resources/rain-snow-showers-night.svg";
import rain_snow from "./resources/rain-snow.svg";
import rain from "./resources/rain.svg";
import showers_day from "./resources/showers-day.svg";
import showers_night from "./resources/showers-night.svg";
import sleet from "./resources/sleet.svg";
import snow_showers_day from "./resources/snow-showers-day.svg";
import snow_showers_night from "./resources/snow-showers-night.svg";
import snow from "./resources/snow.svg";
import thunder_rain from "./resources/thunder-rain.svg";
import thunder_showers_day from "./resources/thunder-showers-day.svg";
import thunder_showers_night from "./resources/thunder-showers-night.svg";
import thunder from "./resources/thunder.svg";
import wind from "./resources/wind.svg";
/*
TODO Spec:
  - display temps etc
  - toggle between celcius or fahrenheit
  - style page based on weather info

  - OK to not store api key in environment variable

 */

const iconSet = {
  "clear-day": clear_day,
  "clear-night": clear_night,
  cloudy: cloudy,
  fog: fog,
  hail: hail,
  "partly-cloudy-day": partly_cloudy_day,
  "partly-cloudy-night": partly_cloudy_night,
  "rain-snow-showers-day": rain_snow_showers_day,
  "rain-snow-showers-night": rain_snow_showers_night,
  "rain-show": rain_snow,
  rain: rain,
  "showers-day": showers_day,
  "showers-night": showers_night,
  sleet: sleet,
  "snow-showers-day": snow_showers_day,
  "snow-showers-night": snow_showers_night,
  snow: snow,
  "thunder-rain": thunder_rain,
  "thunder-showers-day": thunder_showers_day,
  "thunder-showers-night": thunder_showers_night,
  thunder: thunder,
  wind: wind,
};

const submitBtn = document.getElementById("submit");
const searchBox = document.getElementById("search-input");
const container = document.querySelector(".container");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");
const loc = document.getElementById("location");
const icon = document.getElementById("icon");
const conditions = document.getElementById("condition");
const tempNow = document.getElementById("temp-now");
const desc = document.getElementById("desc");
const windElem = document.getElementById("wind");

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=days%2Ccurrent&key=MXSETQH3ZJK23U3RGU99F8SMC&contentType=json`
  );

  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

async function processData(location) {
  try {
    const data = await getWeatherData(location);
    const desiredData = {};
    desiredData.location = data.resolvedAddress;
    desiredData.minTemp = data.days[0].tempmin;
    desiredData.maxTemp = data.days[0].tempmax;
    desiredData.currentTemp = data.currentConditions.temp;
    desiredData.icon = data.currentConditions.icon;
    desiredData.description = data.days[0].description;
    desiredData.currentConditions = data.currentConditions.conditions;
    desiredData.currentWindSpeed = data.currentConditions.windspeed;
    return desiredData;
  } catch (err) {
    if (err instanceof HttpError) {
      if (err.response.status == 400) {
        alert("No such location, please enter valid location");
      } else {
        alert(err);
      }
      return 0;
    }
  }
}

function displayWeather(location) {
  processData(location).then((data) => {
    if (data != 0) {
      loc.textContent = data.location;
      icon.src = iconSet[data.icon];
      icon.title = data.icon;
      maxTemp.textContent = `max: ${data.maxTemp}°C`;
      minTemp.textContent = `min: ${data.minTemp}°C`;
      conditions.textContent = data.currentConditions;
      tempNow.textContent = `${data.currentTemp}°C`;
      desc.textContent = data.description;
      windElem.textContent = `wind speed: ${data.currentWindSpeed}`;
    }
  });
}

submitBtn.addEventListener("click", () => {
  const location = searchBox.value;
  displayWeather(location);
});
