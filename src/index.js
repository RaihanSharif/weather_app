import "./styles.css";
/*
TODO Spec:
  - display temps etc
  - toggle between celcius or fahrenheit
  - style page based on weather info

  - OK to not store api key in environment variable

 */
const submitBtn = document.getElementById("submit");
const searchBox = document.getElementById("search-input");

const formToObj = (form) => Object.fromEntries(new FormData(form));

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=MXSETQH3ZJK23U3RGU99F8SMC&contentType=json`
  );

  return response.json();
}

submitBtn.addEventListener("click", () => {
  const city = searchBox.value;

  getWeatherData(city).then((data) => console.log(data));
});
