const express = require('express');
// const hbs = require('hbs');
// const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const publicPath = path.join(__dirname, '../client');
const app = express();

// app.use(bodyParser.json());
// app.set('view engine', 'hbs');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/result/', async (req, res) => {
  const { location } = req.query;
  const encodedLocation = encodeURIComponent(location);
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=AIzaSyA9IOBTC9RCjuTR3QChNOVEu9Ri0yX3k4U`);
  const { lat, lng } = response.data.results[0].geometry.location;
  const weather = await axios.get(`https://api.darksky.net/forecast/7aab4afb7ad387ca11385ced7b3c041e/${lat},${lng}?units=si`);
  const info = {
    temperature: weather.data.currently.temperature,
    apparentTemperature: weather.data.currently.apparentTemperature,
    summary: weather.data.currently.summary,
  };

  res.send(info);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
