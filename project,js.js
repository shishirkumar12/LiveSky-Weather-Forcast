const searchBox = document.getElementById('search-box');
const city = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const hiLow = document.getElementById('hi-low');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');

const apiKey = 'YOUR_API_KEY';

searchBox.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const cityName = e.target.value.trim();
    e.target.value = '';

    if (cityName) {
      try {
        const response = await axios.get(`"https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"=${cityName}&appid=${apiKey}&units=metric`);

        city.textContent = response.data.name;
        date.textContent = new Date().toDateString();
        temp.textContent = Math.round(response.data.main.temp) + '°c';
        weather.textContent = response.data.weather[0].description;
        hiLow.textContent = `${Math.round(response.data.main.temp_min)}°c / ${Math.round(response.data.main.temp_max)}°c`;
        humidity.textContent = `Humidity: ${response.data.main.humidity}%`;
        pressure.textContent = `Pressure: ${response.data.main.pressure} hPa`;

        for (let i = 0; i < 5; i++) {
          const cloud = document.createElement('div');
          cloud.className = 'cloud';
          cloud.style.left = `${Math.random() * 100}%`;
          cloud.style.animationDuration = `${Math.random() * 5 + 5}s`;
          document.body.appendChild(cloud);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});