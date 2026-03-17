import headerImg from "./images/header.png";

const header = document.querySelector("header");
const input = document.createElement("input");
const errorMessage = document.createElement("p");
const searchButton = document.createElement("button");
const container = document.querySelector(".container");
const toggleButton = document.createElement("button");
const leftElement = document.createElement("div");
const headerContent = document.createElement("div");
const errorBody = document.createElement("div");
const cancelError = document.createElement("p");
const headerText = document.createElement("h2");
const cardContainer = document.querySelector(".card-container");
const headerImage = document.createElement("img");

let isCelsius = true;
let weatherData = null;

input.type = "search";
input.placeholder = "Enter city name";
searchButton.textContent = "Search";
toggleButton.textContent = "Switch to °F";
errorMessage.classList.add("errorMessage");
headerImage.src = headerImg;
headerImage.classList.add("headerImg");

errorBody.append(errorMessage, cancelError);
cancelError.classList.add("cancelBtn");
cancelError.textContent = "X";
headerText.textContent = "What's the Weather?";
leftElement.append(input, searchButton);
header.appendChild(leftElement);
leftElement.classList.add("leftElement");

header.appendChild(toggleButton);
container.appendChild(errorBody);
headerContent.append(headerText, headerImage);
headerContent.classList.add("headerContent");
container.appendChild(headerContent);
errorBody.classList.add("errorBody");

const apiKey = "8VKZY4GC43ZYN69ZXKYSTL42C";
const unitGroup = "metric";
const contentType = "json";

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}


function updateWeatherDisplay() {
  if (!weatherData) return;

  const temp = isCelsius
    ? weatherData.currentConditions.temp
    : celsiusToFahrenheit(weatherData.currentConditions.temp);

  const tempUnit = isCelsius ? "°C" : "°F";

  const card = document.createElement("div");
  card.classList.add("weatherCard");

  card.innerHTML = `
        <div class ='cardTitle'>
            <h2>${weatherData.resolvedAddress}</h2>
        </div>
        
        <div class ='cardContent'>
            <div class = 'active'>
                <h3>Temperature</h3>
                <p>${temp.toFixed(1)}${tempUnit}</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M338.5-138.5Q280-197 280-280q0-51 23-96t68-67v-328q0-45.42 32-77.21Q435-880 480-880t77 31.79q32 31.79 32 77.21v328q45 22 68 67t23 96q0 83-58.5 141.5T480-80q-83 0-141.5-58.5ZM431-515h98v-53h-49v-39h49v-87h-49v-38.5h49V-771q0-20.83-14.12-34.91-14.13-14.09-35-14.09Q459-820 445-805.91q-14 14.08-14 34.91v256Z"/></svg>
                
            </div>
            <div>
                <h3>Conditions</h3>
                <p>${weatherData.currentConditions.conditions}</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M348.5-755.42q-21.5-21.42-21.5-51.5t21.42-51.58q21.42-21.5 51.5-21.5t51.58 21.42q21.5 21.42 21.5 51.5t-21.42 51.58q-21.42 21.5-51.5 21.5t-51.58-21.42ZM738-261.86q32-31.86 32-78T738.14-418q-31.86-32-78-32T582-418.14q-32 31.86-32 78T581.86-262q31.86 32 78 32T738-261.86ZM864-94 757-201q-22 15-46.32 23-24.33 8-50.68 8-70.83 0-120.42-49.62Q490-269.24 490-340.12t49.62-120.38q49.62-49.5 120.5-49.5t120.38 49.58Q830-410.83 830-340q0 26.35-8 50.68Q814-265 799-243l107 107-42 42ZM447-80v-173q10 25 25 46.5t35 38.5v88h-60Zm-154 0v-533q-64.03-4.58-127.02-13.29Q103-635 40-650l15-60q85.27 20 171.04 28.5 85.78 8.5 174.09 8.5 88.32 0 174.09-8.5Q660-690 745-710l15 60q-63 15-125.98 23.71Q571.03-617.58 507-613v101q-35 32-56 76.5T430-340h-77v260h-60Z"/></svg>
            </div>
            <div>
                <h3>Humidity</h3>
                <p>${weatherData.currentConditions.humidity}%</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M615.5-264.62q14.5-14.62 14.5-35.5 0-20.88-14.62-35.38-14.62-14.5-35.5-14.5-20.88 0-35.38 14.62-14.5 14.62-14.5 35.5 0 20.88 14.62 35.38 14.62 14.5 35.5 14.5 20.88 0 35.38-14.62ZM378-256l246-246-42-42-246 246 42 42Zm37.5-208.62q14.5-14.62 14.5-35.5 0-20.88-14.62-35.38-14.62-14.5-35.5-14.5-20.88 0-35.38 14.62-14.5 14.62-14.5 35.5 0 20.88 14.62 35.38 14.62 14.5 35.5 14.5 20.88 0 35.38-14.62ZM251.5-174Q160-268 160-408q0-100 79.5-217.5T480-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80q-137 0-228.5-94ZM666-216.5q74-76.5 74-191.82 0-78.68-66.5-179.18T480-800Q353-688 286.5-587.5T220-408.32Q220-293 294-216.5T480-140q112 0 186-76.5ZM480-480Z"/></svg>
            </div>
            <div>
                <h3>Wind Speed</h3>
                <p>${weatherData.currentConditions.windspeed} km/h</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M465-160q-54 0-85.5-28T348-273h68q0 26 11.5 39.5T465-220q27 0 38.5-12t11.5-41q0-29-11.5-42.5T465-329H80v-60h385q54 0 82 28t28 88q0 57-28 85t-82 28ZM80-568v-60h548q37 0 54-17.5t17-58.5q0-41-17-58.5T628-780q-38 0-55 20.5T556-708h-60q0-58 35-95t97-37q61 0 96 35.5T759-704q0 65-35 100.5T628-568H80Zm672 330v-60q35 0 51.5-19.5T820-374q0-38-18.5-55T748-446H80v-60h668q62 0 97 35t35 97q0 64-33 100t-95 36Z"/></svg>
            </div>    
            
        </div>

        <div class="cardFooter">
            <small>Last updated: ${new Date().toLocaleTimeString()}</small>
        </div>
    `;
  cardContainer.innerHTML = "";
  cardContainer.appendChild(card);
}

export default async function getWeather() {
  const location = input.value.trim();
  if (!location) {
    errorMessage.textContent = "Please enter a city name";
    errorBody.style.display = "flex";
    errorBody.style.justifyContent = "space-between";
    errorBody.style.alignItems = "center";

    return;
  }

  try {
    errorBody.style.display = "none";
    cardContainer.innerHTML = `
        <div class='animatedLoader'>
            <img src="https://i.gifer.com/ZZ5H.gif" alt="Please wait..." width = "60px">
        </div>
        
        `;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${apiKey}&contentType=${contentType}`;
    const response = await fetch(url);
    console.log("Fetching weather for:", location);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API Error:", errorData);
      throw new Error("Location not found");
    }

    weatherData = await response.json();

    updateWeatherDisplay();
  } catch (err) {
    weatherData = null;
    cardContainer.innerHTML = "";
    errorMessage.textContent =
      "Location not found. Please check the city name and try again";
    errorBody.style.display = "flex";
  }
}

toggleButton.addEventListener("click", (e) => {
  e.preventDefault();
  isCelsius = !isCelsius;
  toggleButton.textContent = isCelsius ? "Switch to °F" : "Switch to °C";

  if (weatherData) {
    updateWeatherDisplay();
  }
});

cancelError.addEventListener("click", () => {
  errorBody.style.display = "none";
});

// Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getWeather();
  }
});

// Search Button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather();
});
