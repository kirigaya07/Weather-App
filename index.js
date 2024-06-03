const getWeather = (city) => {
  document.getElementById("cityName").innerHTML = city;
  const url =
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e04acfee01msh5b8330980896872p1fdf0ejsn704ea4ee0983",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  async function fetchData() {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const result = await response.json();
      console.log(result);
      document.getElementById("temp").innerHTML = result.temp;
      document.getElementById("feels_like").innerHTML = result.feels_like;
      document.getElementById("humidity2").innerHTML = result.humidity;
      document.getElementById("min_temp").innerHTML = result.min_temp;
      document.getElementById("max_temp").innerHTML = result.max_temp;
      document.getElementById("wind_speed2").innerHTML = result.wind_speed;
      document.getElementById("wind_degrees").innerHTML = result.wind_degrees;
      document.getElementById("sunrise").innerHTML = result.sunrise;
      document.getElementById("sunset").innerHTML = result.sunset;
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data. Please try again later.");
    }
  }

  fetchData();
};

document.getElementById("dark").addEventListener("click", function () {
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
