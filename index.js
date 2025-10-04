const weatherBox = document.getElementById("weather-content");
const riskBox = document.getElementById("risk-content");
const searchInput = document.querySelector(".search-input");
const API_KEY = "b3abb00cc04e4755ae6121946250410";
async function fetchWeather(city) {
    if (!city) return;

    weatherBox.innerHTML = "<p>Loading weather...</p>";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.cod === 200) {
            weatherBox.innerHTML = `
                <p><strong>${data.name}, ${data.sys.country}</strong></p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        } else {
            weatherBox.innerHTML = `<p>City not found. Please try again.</p>`;
        }
    } catch (error) {
        weatherBox.innerHTML = `<p>Error fetching weather.</p>`;
        console.error(error);
    }
}
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchInput.value.trim();
        if (city) fetchWeather(city);
    }
});
const searchIcon = document.querySelector(".search-icon");
searchIcon.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
});

