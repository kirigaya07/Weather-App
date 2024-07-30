const getWeather = (city) => {
  document.getElementById("cityName").innerHTML = city;
  const apiKey = "fa156de1d7f2fd0452b4173fd8943827";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.floor((deg + 22.5) / 45) % 8;
    return directions[index];
  };

  async function fetchData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const result = await response.json();
      console.log(result);

      document.getElementById("temp").innerHTML = result.main.temp;
      document.getElementById("feels_like").innerHTML = result.main.feels_like;
      document.getElementById("humidity2").innerHTML = result.main.humidity;
      document.getElementById("min_temp").innerHTML =
        result.main.temp_min - 2.14;
      document.getElementById("max_temp").innerHTML = result.main.temp_max;
      document.getElementById("wind_speed2").innerHTML = result.wind.speed;

      const windDirection = getWindDirection(result.wind.deg);
      document.getElementById("wind_degrees").innerHTML = windDirection;

      const sunrise = new Date(result.sys.sunrise * 1000);
      const sunset = new Date(result.sys.sunset * 1000);
      document.getElementById("sunrise").innerHTML =
        sunrise.toLocaleTimeString();
      document.getElementById("sunset").innerHTML = sunset.toLocaleTimeString();

      const iconCode = result.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById("weather_icon").src = iconUrl;

      document.getElementById("weather_description").innerHTML =
        result.weather[0].description;
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data. Please try again later.");
    }
  }

  fetchData();
};

document.getElementById("dark").addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", newTheme);
});

document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  getWeather(city);
});
// Load weather data for Delhi by default
getWeather("Delhi");
