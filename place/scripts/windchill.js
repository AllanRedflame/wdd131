const url = 'https://api.openweathermap.org/data/2.5/weather?q=seattle&units=imperial&appid=f39973082ab5286d5c823eb243fa4a43';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error(await response.text());

    const data = await response.json();
    displayResults(data);

  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(weatherData) {

    const iconMap = {
  "01d": "images/sunny.svg",
  "01n": "images/clear-night.svg",

  "02d": "images/cloud.svg",
  "02n": "images/cloud.svg",

  "03d": "images/cloud.svg",
  "03n": "images/cloud.svg",

  "04d": "images/cloud.svg",
  "04n": "images/cloud.svg",

  "09d": "images/rain.svg",
  "09n": "images/rain.svg",

  "10d": "images/rain.svg",
  "10n": "images/rain.svg",

  "11d": "images/rain.svg",
  "11n": "images/rain.svg",

  "13d": "rain/snow.svg",
  "13n": "rain/snow.svg",

  "50d": "images/fog.svg",
  "50n": "images/fog.svg"
};

  const temperature = weatherData.main.temp;
  const mph = weatherData.wind.speed;
  const desc = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;
  const iconSrc = iconMap[iconCode];
  
  const container = document.querySelector(".bottom-right");

  if (!container) {
    console.error("No .bottom-right container found.");
    return;
  }
  const weatherBox = document.createElement("div");
  weatherBox.classList.add("weather-box");

  const iconImg = document.querySelector("#icon");
  iconImg.src = iconSrc;
  iconImg.alt = desc;

  const tempEl = document.createElement("p");
  tempEl.textContent = `Temperature: ${Math.round(temperature)}°`;
  weatherBox.appendChild(tempEl);

  const windEl = document.createElement("p");
  windEl.textContent = `Wind Speed: ${Math.round(mph)} mph`;
  weatherBox.appendChild(windEl);

  const descEl = document.createElement("p");
  descEl.textContent = `Conditions: ${desc}`;
  weatherBox.appendChild(descEl);

  const windChillEl = document.createElement("p");

  const windChill = Math.round(
    35.74 +
    0.6215 * temperature -
    35.75 * mph ** 0.16 +
    0.4275 * temperature * mph ** 0.16
  );

  if (temperature <= 50 && mph > 3) {
    windChillEl.textContent = `Feels like: ${windChill}°`;
  } else {
    windChillEl.textContent = "Wind chill: None";
  }

  weatherBox.appendChild(windChillEl);

  container.appendChild(weatherBox);
}
