function getWeatherForecast() {
  var apiKey = '80e0a4fcd4aceda646a69e069148953e'; // Replace with your OpenWeatherMap API key
  var city = document.getElementById('cityInput').value;

  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          displayWeatherForecast(data);
      })
      .catch(error => {
          console.error('Fetch error:', error);
      });
}

function displayWeatherForecast(data) {
  var forecastContainer = document.getElementById('forecastContainer');
  forecastContainer.innerHTML = ''; 

  for (let i = 0; i < data.list.length; i += 8) {
      var forecastItem = data.list[i];
      var dateTime = forecastItem.dt_txt;
      var temperature = forecastItem.main.temp;
      var description = forecastItem.weather[0].description;

      var forecastCard = document.createElement('div');
      forecastCard.innerHTML = `
          <p>Date/Time: ${dateTime}</p>
          <p>Temperature: ${temperature} &deg;F</p>
          <p>Description: ${description}</p>
          <hr>
      `;
      forecastContainer.appendChild(forecastCard);
  }
}
