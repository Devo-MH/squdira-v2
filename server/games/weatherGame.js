const axios = require('axios');

const fetchWeatherGame = async () => {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
    const city = 'London'; // Example city
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    
    const weatherData = response.data;
    return {
      id: weatherData.id,
      title: `Weather in ${weatherData.name}`,
      description: weatherData.weather[0].description,
      thumbnail: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`, // Weather icon as thumbnail
      gameUrl: `https://openweathermap.org/city/${weatherData.id}`, // Link to the weather page for this city
      genre: 'Weather', // Treat this as a "genre" for now
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

module.exports = fetchWeatherGame;
