// Weather API Integration using OpenWeatherMap
const WEATHER_API_KEY = '589d57e24fb754b457c8b9aaf7e0f6b6'; // Replace with your OpenWeatherMap API key
const FREETOWN_COORDS = { lat: 8.4657, lon: -13.2317 };

// Fetch current weather for Freetown
async function fetchWeather() {
  return await fetchAPI(
    `https://api.openweathermap.org/data/2.5/weather?lat=${FREETOWN_COORDS.lat}&lon=${FREETOWN_COORDS.lon}&units=metric&appid=${WEATHER_API_KEY}`
  );
}

// Fetch 5-day forecast
async function fetchForecast() {
  return await fetchAPI(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${FREETOWN_COORDS.lat}&lon=${FREETOWN_COORDS.lon}&units=metric&appid=${WEATHER_API_KEY}`
  );
}

// Display weather widget
async function displayWeatherWidget() {
  const weatherContainer = document.querySelector('#weather-widget');
  if (!weatherContainer) return;
  
  const weatherData = await fetchWeather();
  
  if (!weatherData) {
    weatherContainer.innerHTML = `
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle me-2"></i>
        Weather data unavailable. Please add your OpenWeatherMap API key.
      </div>
    `;
    return;
  }
  
  const temp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const description = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  
  weatherContainer.innerHTML = `
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <h5 class="fw-bold mb-3">
          <i class="fas fa-cloud-sun text-warning me-2"></i>Current Weather in Freetown
        </h5>
        <div class="d-flex align-items-center mb-3">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" style="width: 80px; height: 80px;">
          <div class="ms-3">
            <h2 class="mb-0 fw-bold">${temp}°C</h2>
            <p class="text-muted mb-0 text-capitalize">${description}</p>
          </div>
        </div>
        <div class="row g-2 small">
          <div class="col-6">
            <i class="fas fa-temperature-high text-danger me-2"></i>
            Feels like: <strong>${feelsLike}°C</strong>
          </div>
          <div class="col-6">
            <i class="fas fa-tint text-primary me-2"></i>
            Humidity: <strong>${humidity}%</strong>
          </div>
          <div class="col-6">
            <i class="fas fa-wind text-info me-2"></i>
            Wind: <strong>${windSpeed} m/s</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Display 5-day forecast
async function displayForecast() {
  const forecastContainer = document.querySelector('#forecast-widget');
  if (!forecastContainer) return;
  
  const forecastData = await fetchForecast();
  
  if (!forecastData) {
    forecastContainer.innerHTML = `
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-triangle me-2"></i>
        Forecast data unavailable.
      </div>
    `;
    return;
  }
  
  // Get one forecast per day (every 8th item = 24 hours)
  const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
  
  const forecastHTML = dailyForecasts.map(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(day.main.temp);
    const icon = day.weather[0].icon;
    const description = day.weather[0].description;
    
    return `
      <div class="col text-center">
        <div class="p-3 border rounded">
          <p class="fw-bold mb-2">${dayName}</p>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" style="width: 50px; height: 50px;">
          <p class="mb-0 fw-bold">${temp}°C</p>
          <p class="small text-muted mb-0 text-capitalize">${description}</p>
        </div>
      </div>
    `;
  }).join('');
  
  forecastContainer.innerHTML = `
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <h5 class="fw-bold mb-3">
          <i class="fas fa-calendar-alt text-success me-2"></i>5-Day Forecast
        </h5>
        <div class="row row-cols-5 g-2">
          ${forecastHTML}
        </div>
      </div>
    </div>
  `;
}

// Initialize weather widgets
document.addEventListener('DOMContentLoaded', function() {
  displayWeatherWidget();
  displayForecast();
});
