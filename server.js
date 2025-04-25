const express = require("express");
const https = require("https");
const path = require("path");
require("dotenv").config();
console.log(process.env.NEWS_API_KEY);
console.log(process.env.WEATHER_API_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to fetch news articles
app.get("/news", (req, res) => {
  // Construct the URL for the news API
  const url = `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&language=bn`;
  https
    .get(url, (apiRes) => {
      let data = "";
      apiRes.on("data", (chunk) => (data += chunk));
      apiRes.on("end", () => {
        res.json(JSON.parse(data));
      });
    })
    .on("error", (err) => {
      console.error("Error fetching news:", err);
      res.status(500).send("Error fetching news");
    });
});

// Endpoint to fetch weather data
app.get("/weather", (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=${process.env.WEATHER_API_KEY}`;
  https
    .get(url, (apiRes) => {
      let data = "";
      apiRes.on("data", (chunk) => (data += chunk));
      apiRes.on("end", () => {
        res.json(JSON.parse(data));
      });
    })
    .on("error", (err) => {
      console.error("Error fetching weather:", err);
      res.status(500).send("Error fetching weather");
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
