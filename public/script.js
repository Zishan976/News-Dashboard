$(document).ready(function () {
  // Fetch and display Weather Data
  $.get("/weather", function (data) {
    // Convert temperature from Kelvin to Celsius
    const tempCelsius = (data.main.temp - 273.15).toFixed(1);

    // Fetch the weather icon URL
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Weather data components with icon
    const weatherDetails = `
      <p style="margin:0;"><img style="margin: auto;display: block;" src="${iconUrl}" alt="Weather Icon" /></p>
      <p style="margin-top:0;"><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${tempCelsius}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    // Populate the weather widget
    $("#weather-container").html(weatherDetails);
  }).fail(function () {
    console.error("Error fetching weather");
    $("#weather-container").html("<p>Failed to load weather data.</p>");
  });

  // Fetch and display Top Stories (News Articles)
  $.get("/news", function (data) {
    const newsContainer = $("#news-container");
    data.results.forEach((article) => {
      const newsItem = `<div class="news-item">
        <img src="${article.image_url}" alt="${
        article.title
      }" class="news-image" />
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <p><strong>Published At:</strong> ${new Date(
          article.pubDate
        ).toLocaleString()}</p>
        <a href="${article.link}" target="_blank">Read More</a>
      </div>`;
      newsContainer.append(newsItem);
    });
  }).fail(function () {
    console.error("Error fetching news");
    $("#news-container").html("<p>Failed to load news articles.</p>");
  });
});

$.get("/news", function (data) {
  const picksContainer = $("#picks-container");
  const picks = data.results.slice(0, 5); // Limit to the first 5 articles
  picks.forEach((article) => {
    const pickItem = `<div class="pick-item">
      <img src="${article.image_url}" alt="${article.title}" class="pick-image" />
      <h3>${article.title}</h3>
      <a href="${article.link}" target="_blank">Read More</a>
    </div>`;
    picksContainer.append(pickItem);
  });
}).fail(function () {
  console.error("Error fetching curated picks");
  $("#picks-container").html("<p>Failed to load curated picks.</p>");
});
