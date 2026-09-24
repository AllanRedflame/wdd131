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
  const temperature = weatherData.main.temp;
  const mph = weatherData.wind.speed;
  const desc = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/w/${iconCode}.png`;

  // Find the container
  const container = document.querySelector(".bottom-right");

  // Safety check
  if (!container) {
    console.error("No .bottom-right container found.");
    return;
  }

  // Create a wrapper for all weather info
  const weatherBox = document.createElement("div");
  weatherBox.classList.add("weather-box");

    // Weather Icon
  const iconImg = document.createElement("img");
  iconImg.src = iconSrc;
  iconImg.alt = desc;
  weatherBox.appendChild(iconImg);

  // Temperature
  const tempEl = document.createElement("p");
  tempEl.textContent = `Temperature: ${Math.round(temperature)}°`;
  weatherBox.appendChild(tempEl);

  // Wind Speed
  const windEl = document.createElement("p");
  windEl.textContent = `Wind Speed: ${Math.round(mph)} mph`;
  weatherBox.appendChild(windEl);

  // Description
  const descEl = document.createElement("p");
  descEl.textContent = `Conditions: ${desc}`;
  weatherBox.appendChild(descEl);

  // Wind Chill
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
