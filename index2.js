const getWeather = (city) => {
  document.getElementById("cityName").innerHTML = city;
  const url =
    "https://yahoo-weather5.p.rapidapi.com/weather?location=" +
    city +
    "&format=json&u=f";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e04acfee01msh5b8330980896872p1fdf0ejsn704ea4ee0983",
      "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
    },
  };

  async function fetchData() {
    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Parse JSON response
      document.getElementById("cloud_pct").innerHTML =
        result.current_observation.atmosphere.visibility;
      document.getElementById("temp").innerHTML =
        result.current_observation.condition.temperature;
      document.getElementById("feels_like").innerHTML =
        result.current_observation.atmosphere.pressure;
      document.getElementById("humidity").innerHTML =
        result.current_observation.atmosphere.humidity;
      document.getElementById("min_temp").innerHTML =
        result.current_observation.condition.text;
      document.getElementById("wind_speed").innerHTML =
        result.current_observation.wind.speed;
      document.getElementById("wind_degrees").innerHTML =
        result.current_observation.wind.direction;
      document.getElementById("sunrise").innerHTML =
        result.current_observation.astronomy.sunrise;
      document.getElementById("sunset").innerHTML =
        result.current_observation.astronomy.sunset;
      console.log(result); // Print the parsed JSON object
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
};

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value;
  if (city.trim() !== "") {
    // Check if the city input is not empty
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

// Initially display the weather of Delhi
getWeather("Delhi");
