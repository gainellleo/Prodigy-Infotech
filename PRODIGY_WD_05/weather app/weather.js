function getWeather() {
    const apiKey = '9f23b56e8dcad8299bf4e5a2a3fc932b';
    const locationInput = document.getElementById('location');
    const location = locationInput.value;

    if (location.trim() === '') {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                fetchWeather(apiUrl);
            },
            error => {
                console.log('Error getting location:', error);
                alert('Unable to get your location. Please enter a city name instead.');
            }
        );
    } else {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetchWeather(apiUrl);
    }
}

function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    
    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        const html = `
            <p>City: ${cityName}</p>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
        `;

        weatherInfo.innerHTML = html;
    }
}
