import bgImage from './images/weather.png';

const header = document.querySelector('header');
const input = document.createElement('input');
const errorMessage = document.createElement('p');
const weatherInfo = document.createElement('div');
const searchButton = document.createElement('button');
const container = document.querySelector('.container');


input.type = 'text';
input.placeholder = 'Enter city name';
searchButton.textContent = 'Search';
errorMessage.classList.add('errorMessage');

header.appendChild(input);
header.appendChild(searchButton);
container.appendChild(errorMessage);
container.appendChild(weatherInfo);

weatherInfo.classList.add('weatherInfo');
document.body.style.backgroundImage = `url(${bgImage})`
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundRepeat = 'no-repeat';



const apiKey = '8VKZY4GC43ZYN69ZXKYSTL42C';
const unitGroup = 'metric';
const contentType = 'json';

export default async function getWeather() {
    const location = input.value.trim();
    if (!location) {
        errorMessage.textContent = 'Please enter a city name';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        errorMessage.style.display = 'none';
        weatherInfo.innerHTML = `
        <img src="https://i.gifer.com/ZZ5H.gif" alt="Please wait..." width="30">
        `

        // weatherInfo.textContent = 'Please wait...';

        const getData = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&key=${apiKey}&contentType=${contentType}`;
        
        console.log('Fetching weather for:', location); 
        const response = await fetch(getData);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Error:', errorData); 
            throw new Error('Location not found');
        }

        const data = await response.json();

       
        weatherInfo.innerHTML = `
            <h2>${data.resolvedAddress}</h2>
            <p>Temperature: ${data.currentConditions.temp}°C</p>
            <p>Conditions: ${data.currentConditions.conditions}</p>
            <p>Humidity: ${data.currentConditions.humidity}%</p>
            <p>Wind Speed: ${data.currentConditions.windspeed} km/h</p>
        `;
    } catch (err) {
        console.error('Error details:', err); 
        weatherInfo.textContent = '';
        errorMessage.textContent = 'Location not found. Please check the city name and try again';
        errorMessage.style.display = 'block';
    }
}

// Enter key
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getWeather();
    }
});

// Search Button
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather();
});